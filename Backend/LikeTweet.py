import tweepy
import json
import os

def LikeTweet(received):
# Loads the given tweet ID and converts it from JSON into an integer value "tweet_ID".
    tweet_ID = json.loads(received)
    Converted_ID = int(convert_ID["id"])
    
# Access tokens for Twitter access.
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    e = transformed_received["token"]
    f = transformed_received["secret"]
    g = transformed_received["id"]
    h = transformed_received["status"]
    auth = tweepy.OAuthHandler(c, d)
    auth.set_access_token(e, f)
    api = tweepy.API(auth, wait_on_rate_limit=True)
    
# Likes the tweet of the given ID.
    if (h = "like"):
        try
            api.create_favorite(g)
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
        try
            api.destroy_favorite(g)
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
    
    return response_generator(200, "Liked/Unliked successfully");
    
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
    return LikeTweet(event['body'])