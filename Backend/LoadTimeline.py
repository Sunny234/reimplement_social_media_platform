import tweepy
import json
import os

def LoadTimeline(body):
    tokens = json.loads(body)
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    e = tokens['access_token'] #os.environ['ACCESS_TOKEN']
    f = tokens['access_token_secret'] #os.environ['ACCESS_TOKEN_SECRET']
    auth = tweepy.OAuthHandler(c, d)
    auth.set_access_token(e, f)
    api = tweepy.API(auth, wait_on_rate_limit = True)
    try:
        cursor = api.user_timeline(tweet_mode="extended")
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
    timeline = []
    for i in range(len(cursor)):
        userTweet = cursor[i]
        f = json.dumps(userTweet._json, ensure_ascii = False, indent = 4)
        a = json.loads(f)
        timeline.append(a)
        print(a)
    return response_generator(200, timeline)
    
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
    return LoadTimeline(event['body'])