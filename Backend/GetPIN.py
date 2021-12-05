import tweepy
import boto3
import json
import os

def GetPIN(input):
    values = json.loads(input)
    #values = json.loads(f)
    #print(input)
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
    db_table.delete_item(
    Key = {
        'ID': int(values["ID"])
        })
    try:
        login.get_access_token(values["PIN"])
    except tweepy.errors.BadRequest as error:
        return response_generator(error.response.status_code, str(error.response.json()["errors"][0]["message"]));
    except tweepy.errors.Unauthorized as error:
        return response_generator(error.response.status_code, str(error.response.json()["errors"][0]["message"]));                    
    except tweepy.errors.Forbidden as error:
        return response_generator(error.response.status_code, str(error.response.json()["errors"][0]["message"]));
    except tweepy.errors.NotFound as error:
        return response_generator(error.response.status_code, str(error.response.json()["errors"][0]["message"]));
    except tweepy.errors.TooManyRequests as error:
        return response_generator(error.response.status_code, str(error.response.json()["errors"][0]["message"]));
    except tweepy.errors.TwitterServerError as error:
        return response_generator(error.response.status_code, str(error.response.json()["errors"][0]["message"]));
   
    tokens.append(login.access_token)
    tokens.append(login.access_token_secret)

    actual_tokens = {
            "access_token": tokens[0],
            "access_token_secret": tokens[1]#,
            #"user_id": tokens[2]
        }
    return response_generator(200, json.dumps(actual_tokens))
    
def response_generator(code, response):
    return {
            'statusCode' : code,
            'headers' : {
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods" : "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT"
            },
            'body': response,
            'isBase64Encoded': False
        }

def lambda_handler(event, context):
    return GetPIN(event['body'])
