import tweepy
import json
import os

def GetPIN(PIN):
    int(PIN)
    tokens = []
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    login = tweepy.OAuthHandler(c, d)
    login.get_access_token(PIN)
    tokens.append(login.access_token)
    tokens.append(login.access_token_se)
    return tokens

def lambda_handler(event, context):
    return {
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
        'statusCode': 200,
        'body': GetPIN(event['body'])
    }