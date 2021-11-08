import tweepy
import boto3
import json
import os

def GetPIN(input):
    values = json.loads(input)
    #values = json.loads(f)
    db_client = boto3.resource('dynamodb')
    db_table = db_client.Table('tblLogin')
    tokens = [] 
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    login = tweepy.OAuthHandler(c, d)
    answer = db_table.get_item(
        Key = {
            "ID": int(values["ID"])
        })
    reqtoken = answer['Item']['Token']
    verifier = values["PIN"]
    login.request_token = { 
        'oauth_token' : reqtoken,
        'oauth_token_secret': verifier
        }
    login.get_access_token(values["PIN"])
    tokens.append(login.access_token)
    tokens.append(login.access_token_secret)
    db_table.delete_item(
        Key = {
            'ID': int(values["ID"])
            })
    actual_tokens = {
            "access_token": tokens[0],
            "access_token_secret": tokens[1]
        }
    return actual_tokens

def lambda_handler(event, context):
    return {
        'statusCode' : 200,
        'headers' : {
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods" : "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT"
            },
        'body': json.dumps(GetPIN(event['body']), ensure_ascii = False, indent = 4),
        'isBase64Encoded': False
        }