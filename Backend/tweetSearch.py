import tweepy
import json
import os

def searchTweet(received):
    transformed_received = json.loads(received)
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    e = transformed_received["token"]#os.environ['ACCESS_TOKEN']
    f = transformed_received["secret"]#os.environ['ACCESS_TOKEN_SECRET']
    search_query = transformed_received["searchQuery"]
    auth = tweepy.OAuthHandler(c, d)
    auth.set_access_token(e, f)
    api = tweepy.API(auth, wait_on_rate_limit=True)
    tweets = []
    
    try:
        results = api.search_tweets(q=search_query, result_type='recent', tweet_mode="extended")
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
    
    for tweet in results:
        data = json.loads(json.dumps(tweet._json, ensure_ascii = False, indent = 4))
        tweets.append(data)
        #data = [tweet.id, tweet.text, tweet.user._json['screen_name'], tweet.user._json['name'],
                #tweet.user._json['created_at'], tweet.entities['urls']]
        #data = json.dumps(data, ensure_ascii = False, indent = 4, default = str)
        #f = json.loads(data)
    print(tweets)    
    return response_generator(200, json.dumps(tweets, ensure_ascii = False, indent = 4))

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
    print(event['body'])
    return searchTweet(event['body'])