import tweepy
import json
import os

def FollowUser(received):
# Loads the given tweet ID and converts it from JSON into an integer value "tweet_ID".
    tweet_ID = json.loads(received)
    Converted_ID = int(convert_ID["id"])
    User_ID = 0; # !!!!Need to find out how to pass multiple Id's.!!!!

# Access tokens for Twitter access.
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    e = transformed_received["token"]
    f = transformed_received["secret"]
    auth = tweepy.OAuthHandler(c, d)
    auth.set_access_token(e, f)
    api = tweepy.API(auth, wait_on_rate_limit=True)

# Check follow conditions between accounts.
    followage = api.get_friendship(source_id = User_ID, target_id = Converted_ID)\
    
# Follows the user account based on the given ID.
    if followage[0].following == 0;
        try
            api.follow_user(convert_ID)
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
        return response_generator(200, "Followed Successfully");
    else:
        try
            api.unfollow_user(convert_ID)
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
        return response_generator(200, "Unfollowed Successfully");

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
    return FollowUser(event['body'])