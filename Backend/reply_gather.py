import tweepy
import json
import os

def gatherReply(received):
    transformed_received = received #json.loads(received)
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    e = transformed_received["token"]#os.environ['ACCESS_TOKEN']
    f = transformed_received["secret"]#os.environ['ACCESS_TOKEN_SECRET']
    g = transformed_received["replyID"]
    h = transformed_received["replyUserName"]
    auth = tweepy.OAuthHandler(c, d)
    auth.set_access_token(e, f)
    api = tweepy.API(auth, wait_on_rate_limit=True)
    tweets = []
    search_query = "to:" + h
    results = api.search_tweets(q=search_query, result_type='recent', tweet_mode="extended", since_id=g)
    for tweet in results:
        if tweet["in_reply_to_status_id"] == g)
            data = json.loads(json.dumps(tweet._json, ensure_ascii = False, indent = 4))
            tweets.append(data)
    while (len(results) >= 100):
        count = 0
        last_id = tweet[len(tweets) - 1]["id_str"]
        results = api.search_tweets(q=search_query, result_type='recent', tweet_mode="extended", since_id=g, max_id=last_id)
        for tweet in results:
            if tweet["in_reply_to_status_id"] == g)
                data = json.loads(json.dumps(tweet._json, ensure_ascii = False, indent = 4))
                tweets.append(data)
                count += 1
        if (count <= 0):
            break
    return tweets
        
    print(tweets)    
    return tweets

def lambda_handler(event, context):
    print(event)
    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods" : "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT"
        },
        'body': json.dumps(searchTweet(event), ensure_ascii = False, indent = 4),
        'isBase64Encoded': False
    }