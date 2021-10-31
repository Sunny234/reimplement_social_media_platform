import tweepy
import json
import os

def LoadTimeline():
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    e = os.environ['ACCESS_TOKEN']
    f = os.environ['ACCESS_TOKEN_SECRET']
    auth = tweepy.OAuthHandler(c, d)
    auth.set_access_token(e, f)
    api = tweepy.API(auth, wait_on_rate_limit = True)
    cursor = api.user_timeline()
    timeline = []
    for i in range(len(cursor)):
        userTweet = cursor[i]
        f = json.dumps(userTweet._json, ensure_ascii = False, indent = 4)
        timeline.append(f)
    return timeline
        
def lambda_handler(event, context):
    return {
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
        'body' : LoadTimeline()
    }