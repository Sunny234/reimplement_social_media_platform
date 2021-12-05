import tweepy
import json
import os

def GetProfile(received):
# Loads the given user ID and converts it from JSON into an integer value "user_ID".
# If needed can look up screen name rather than ID if front-end would prefer.
    print(received)
    transformed_received = json.loads(received)
    #user_Cred = int(transformed_received["id"])
    
# Access tokens for Twitter access.
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    e = transformed_received["access_token"]
    f = transformed_received["access_token_secret"]
    g = transformed_received["user_id"]
    auth = tweepy.OAuthHandler(c, d)
    auth.set_access_token(e, f)
    api = tweepy.API(auth, wait_on_rate_limit=True)
    results = []
    target_user_info = []
    user_info = []
    
# Get a dict of different user attributes.
    try:
        user_info = api.verify_credentials()
        target_user_info = user_info
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

    if (g == "null"):
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
        except tweepy.errors.TwitterServerError as error:
            return response_generator(error.response.status_code, str(error.response.json()["errors"][0]["message"]));
    else:
        try:
            cursor = api.user_timeline(user_id=g, tweet_mode="extended")
            target_user_info = api.get_user(g)
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
    timeline = []

    for i in range(len(cursor)):
        userTweet = cursor[i]
        f = json.dumps(userTweet._json, ensure_ascii = False, indent = 4)
        a = json.loads(f)
        timeline.append(a)
        print(a)
    results.append(target_user_info._json)
    results.append(timeline)
    results.append(user_info._json)


    return response_generator(200, json.dumps(results ,ensure_ascii = False, indent = 4))
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