import tweepy
import json
import os

def Login():
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    callback_URL = "oob"
    login = tweepy.OAuthHandler(c, d, callback_URL)
    redirect_URL = login.get_authorization_url()
    return redirect_URL

def lambda_handler(event, context):
    return {
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
        'statusCode' : 200,
        'body' : Login()
    }