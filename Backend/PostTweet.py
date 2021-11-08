import tweepy
import json
import os

def PostTweet(input):
    print(input)
    transformed_input = json.loads(input)
    charLimit = 280
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    e = transformed_input["access_token"]#os.environ['ACCESS_TOKEN'] 
    f = transformed_input["access_token_secret"]#os.environ['ACCESS_TOKEN_SECRET']
    g = transformed_input["message"]
    auth = tweepy.OAuthHandler(c, d)
    auth.set_access_token(e, f)
    api = tweepy.API(auth, wait_on_rate_limit=True)
    #rateLimitCountNumber = rateLimitCount(api, auth)
    #print(rateLimitCountNumber)
    
    if (len(g) > charLimit):
        tweet_count = ((len(g) // charLimit) + 1) if (len(g) % charLimit > 0) else (len(g) // charLimit)
        print(tweet_count)
        #if (rateLimitCount > tweet_count):
        #parse tweets and send each one as a separate status.
        prev_id = 0
        tweet_info = ""
        for i in range(tweet_count):
            message_temp = ""
            for j in range((i)*charLimit, charLimit*(i+1) if (len(g) > charLimit*(i+1)) else len(g)):
                message_temp += g[j]
            
            if (i + 1 == 1):
                post_tweet = api.update_status(message_temp)
            else:
                post_tweet = api.update_status(status=message_temp, in_reply_to_status_id=prev_id, auto_populate_reply_metadata=True)
                
            tweet_info = json.dumps(post_tweet._json, ensure_ascii = False, indent = 4)
            new_tweet_info = json.loads(tweet_info)
            prev_id = new_tweet_info["id"]
        return json.dumps({"message":"Multi-tweet success"}) #tweet_info
    else:
        #Single Tweet
        print(g)
        post_tweet = api.update_status(g)
        tweet_info = json.dumps(post_tweet._json, ensure_ascii = False, indent = 4)
        return json.dumps({"message":"Single-tweet success"}) #tweet_info


def lambda_handler(event, context):
     return {
            'statusCode' : 200,
            'headers' : {
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods" : "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT"
            },
            'body': PostTweet(event['body']),
            'isBase64Encoded': False
        }