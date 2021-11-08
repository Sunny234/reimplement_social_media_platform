import tweepy
import json
import os

def LoadTimeline(body):
    tokens = json.loads(body)
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    e = tokens['access_token'] #os.environ['ACCESS_TOKEN']
    f = tokens['access_token_secret'] #os.environ['ACCESS_TOKEN_SECRET']
    auth = tweepy.OAuthHandler(c, d)
    auth.set_access_token(e, f)
    api = tweepy.API(auth, wait_on_rate_limit = True)
    cursor = api.user_timeline(tweet_mode="extended")
    timeline = []
    for i in range(len(cursor)):
        userTweet = cursor[i]
        f = json.dumps(userTweet._json, ensure_ascii = False, indent = 4)
        a = json.loads(f)
        timeline.append(a)
        print(a)
    return timeline
        
def lambda_handler(event, context):
    return {
        'statusCode' : 200,
        'headers': {
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods" : "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT"
            },
        'body' : json.dumps(LoadTimeline(event['body']),ensure_ascii = False, indent = 4),
        'isBase64Encoded': False
        }