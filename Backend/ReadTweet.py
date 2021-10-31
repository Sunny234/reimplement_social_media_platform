import tweepy
import json
import os

def ReadTweet(clicked_tweet):
    int(clicked_tweet)
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    e = os.environ['ACCESS_TOKEN']
    f = os.environ['ACCESS_TOKEN_SECRET']
    auth = tweepy.OAuthHandler(c, d)
    auth.set_access_token(e, f)
    api = tweepy.API(auth, wait_on_rate_limit=True)
    read_tweet = api.get_status(clicked_tweet)
    tweet_info = json.dumps(read_tweet._json, ensure_ascii = False, indent = 4)
    return tweet_info

def lambda_handler(event, context):
    return {
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
        'statusCode': 200,
        'body': ReadTweet(event['body'])
    }