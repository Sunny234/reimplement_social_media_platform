import tweepy
import json
import os

def gatherReply(received):
    transformed_received = json.loads(received)
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    e = transformed_received["token"]#os.environ['ACCESS_TOKEN']
    f = transformed_received["secret"]#os.environ['ACCESS_TOKEN_SECRET']
    g = transformed_received["replyID"]
    h = transformed_received["replyUserName"]
    j = transformed_received["maxID"]
    auth = tweepy.OAuthHandler(c, d)
    auth.set_access_token(e, f)
    api = tweepy.API(auth, wait_on_rate_limit=True)
    tweets = []
    if (j == "null"):       
        try:
            search_query = "to:" + h
            results = tweepy.Cursor(api.search_tweets, q=search_query, result_type="recent", tweet_mode="extended", since_id=g, count=100).items(200) #api.search_tweets(q=search_query, result_type='recent', tweet_mode="extended", since_id=g, count=100).pages(2)
            print("ran")
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
            search_query = "to:" + h
            results = tweepy.Cursor(api.search_tweets, q=search_query, result_type="recent", tweet_mode="extended", since_id=g, count=100, max_id=j).items(200) #api.search_tweets(q=search_query, result_type='recent', tweet_mode="extended", since_id=g, count=100, max_id=j).pages(2)
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
    last_id = 0;
    for tweet in results:
        if tweet._json["in_reply_to_status_id_str"] == g:
            data = json.loads(json.dumps(tweet._json, ensure_ascii = False, indent = 4))
            tweets.append(data)
        last_id = tweet._json["id_str"]
        
    print(tweets)
    results_return = []
    results_return.append(tweets)
    results_return.append(last_id)
    return response_generator(200, tweets)

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
    return gatherReply(event['body'])