

import tweepy
import json
import os

def ReadTweet(received):
    transformed_received = json.loads(received)
    clicked_tweet = int(transformed_received["id"])
    print("id: ", clicked_tweet)
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    e = transformed_received["token"]
    f = transformed_received["secret"]
    auth = tweepy.OAuthHandler(c, d)
    auth.set_access_token(e, f)
    api = tweepy.API(auth, wait_on_rate_limit=True)
    read_tweet = api.get_status(clicked_tweet, tweet_mode="extended")
    tweet_info = json.dumps(read_tweet._json, ensure_ascii = False, indent = 4)
    new_tweet_info = json.loads(tweet_info)
    search_query = "from:" + new_tweet_info["user"]["screen_name"]
    prev_id = new_tweet_info["id"]
    try
        current_search_results = api.search_tweets(q=search_query,since_id=prev_id,tweet_mode="extended")
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
    tweet_list = [new_tweet_info]
    found = True
    while found:  
        found = False
        for tweet in current_search_results:
            transformed_tweet = json.loads(json.dumps(tweet._json, ensure_ascii = False, indent = 4))
            if transformed_tweet["in_reply_to_status_id"] == prev_id:
                tweet_list.append(transformed_tweet)
                prev_id = transformed_tweet["id"]
                try
                    current_search_results = api.search_tweets(q=search_query,since_id=prev_id, tweet_mode="extended")
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
                
                found = True
                break
        
    
    transformed_tweet_info = new_tweet_info
    transformed_tweet_info["full_text"] = combine_text(tweet_list)
    return response_generator(200, transformed_tweet_info)

def combine_text(tweet_list):
    newText = ""
    for tweet in tweet_list:
        newText = newText + tweet["full_text"] + "\n"
    return newText

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
    return ReadTweet(event['body'])