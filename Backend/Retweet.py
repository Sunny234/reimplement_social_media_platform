import tweepy
import json
import os

def Retweet(tweetID):
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    e = os.environ['ACCESS_TOKEN']
    f = os.environ['ACCESS_TOKEN_SECRET']
    auth = tweepy.OAuthHandler(c, d)
    auth.set_access_token(e, f)
    api = tweepy.API(auth, wait_on_rate_limit = True)
    api.retweet(tweetID)

def lambda_handler(event, context):
    return {
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
        'statusCode': Retweet(event['body']),
        'body': json.dumps('Hello from Lambda!')
    }