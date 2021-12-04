import tweepy
import json
import os

def GetProfile(received):
# Loads the given user ID and converts it from JSON into an integer value "user_ID".
# If needed can look up screen name rather than ID if front-end would prefer.
    convert_ID = json.loads(received)
    user_Cred = int(convert_ID["id"])
    
# Access tokens for Twitter access.
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    e = transformed_received["token"]
    f = transformed_received["secret"]
    auth = tweepy.OAuthHandler(c, d)
    auth.set_access_token(e, f)
    api = tweepy.API(auth, wait_on_rate_limit=True)
    
# Get a dict of different user attributes.
    try:
        user_Info = api.get_user(user_id = user_Cred)
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
    except tweepy.errors.TwitterServerErrror as error:
        return response_generator(error.response.status_code, str(error.response.json()["errors"][0]["message"]));
# If user account is protected, return an error message.
    if user_Info.protected == 1:
        return ("Error: User account is private. ")
    
    return user_Info
    
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
    return GetProfile(event['body'])