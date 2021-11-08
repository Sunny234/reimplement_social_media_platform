import tweepy
import json
import os
import boto3
import random

def Login():
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    number = random.randrange(1,99999)
    callback_URL = "oob"
    login = tweepy.OAuthHandler(c, d, callback_URL)
    redirect_URL = login.get_authorization_url()
    db_client = boto3.resource('dynamodb')
    db_table = db_client.Table('tblLogin')
    request_token = login.request_token['oauth_token']
    rs = login.request_token['oauth_token_secret']
    db_table.put_item(
        Item = {
            'ID': number,
            'Token': request_token,
            })
    return {
        "URL": redirect_URL, 
        "ID": number
        }

def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods" : "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT"
            },
        'body': json.dumps(Login(), ensure_ascii = False, indent = 4),
        'isBase64Encoded': False,
        }