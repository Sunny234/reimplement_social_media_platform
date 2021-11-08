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
    return "tweet " + str(tweetID) + " should have +1 retweets"

def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods" : "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT"
        },
        'body': Retweet(event['body']),
        'isBase64Encoded': False
    }