

import tweepy
import json
import os

            #let username = response.data["user"]["name"];
            #let screen_name = response.data["user"]["screen_name"];
            #let profile_image = response.data["user"]["profile_image_url_https"]
            #let tweet_id = response.data["id_str"];
            #let text = response.data["full_text"];
            #let tweet_image = null;
            #if(response.data["entities"]["media"] !== undefined) {
            #tweet_image = response.data["entities"]["media"][0]["media_url_https"];
            #}
            #let retweet_count = response.data["retweet_count"];
            #let favorite_count = response.data["favorite_count"];
            #let retweeted_user = null;
            #let retweeted_text = null;
            #let retweeted_screen_name = null;
            #let retweeted_profile_image = null;
            #if(response.data["retweeted_status"] !== undefined) {
            #    retweeted_user = response.data["retweeted_status"]["user"]["name"];
            #    retweeted_screen_name =response.data["retweeted_status"]["user"]["screen_name"];
            #    retweeted_profile_image = response.data["retweeted_status"]["user"]["profile_image_url_https"];
            #    retweeted_text = response.data["retweeted_status"]["full_text"]; 
            #}
            #let in_reply_to_user = response.data["in_reply_to_screen_name"];
            #let is_quote_status

def ReadTweet(received):
    transformed_received = json.loads(received)
    clicked_tweet = int(transformed_received["id"])
    print("id: ", clicked_tweet)
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    e = transformed_received["token"]
    f = transformed_received["secret"]
    auth = tweepy.OAuthHandler(c, d)
    auth.set_access_token(e, f)
    api = tweepy.Client(consumer_key=c, consumer_secret=d, access_token=e, access_token_secret=f, wait_on_rate_limit=True)
    read_tweet = api.get_tweet(clicked_tweet, user_auth=True, expansions="author_id", tweet_fields=("conversation_id", "public_metrics"), user_fields=("name","username","profile_image_url","referenced_tweets"), media_fields=("url"))
    tweet_info = json.dumps(read_tweet._json, ensure_ascii = False, indent = 4)
    new_tweet_info = json.loads(tweet_info)
    search_query = "from:" + new_tweet_info["includes"]["users"][0]["username"]
    prev_id = new_tweet_info["data"]["id"]
    current_search_results = api.search_tweets(q=search_query,since_id=prev_id,user_auth=True, expansions="referenced_tweets", tweet_fields=("conversation_id", "public_metrics"), user_fields=("name","username","profile_image_url","referenced_tweets"), media_fields=("url"))
    tweet_list = [new_tweet_info]
    found = True
    while found:  
        found = False
        for tweet in current_search_results:
            transformed_tweet = json.loads(json.dumps(tweet._json, ensure_ascii = False, indent = 4))
            if transformed_tweet["data"]["referenced_tweets"][0]["id"] == prev_id and transformed_tweet["data"]["referenced_tweets"][0]["type"] = "replied_to":
                tweet_list.append(transformed_tweet)
                prev_id = transformed_tweet["data"]["id"]
                current_search_results = api.search_tweets(q=search_query,since_id=prev_id,user_auth=True, expansions="referenced_tweets", tweet_fields=("conversation_id", "public_metrics"), user_fields=("name","username","profile_image_url","referenced_tweets"), media_fields=("url"))
                found = True
                break
        
    
    transformed_tweet_info = new_tweet_info
    transformed_tweet_info["data"]["text"] = combine_text(tweet_list)
    return transformed_tweet_info

def combine_text(tweet_list):
    newText = ""
    for tweet in tweet_list:
        newText = newText + tweet["data"]["text"] + "\n"
    return newText

def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'headers' : {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods" : "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT"
        },
        'body': json.dumps(ReadTweet(event['body']), ensure_ascii = False, indent = 4),
        'isBase64Encoded': False
    }