import tweepy
import json
import os

charLimit = 272

def PostTweet(input):
    print(input)
    transformed_input = json.loads(input)
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    e = transformed_input["access_token"]
    f = transformed_input["access_token_secret"]
    g = transformed_input["message"]
    isReply = transformed_input["is_reply"]
    replyID = transformed_input["reply_ID"]
    auth = tweepy.OAuthHandler(c, d)
    auth.set_access_token(e, f)
    api = tweepy.API(auth, wait_on_rate_limit=True)
  
    if (len(g) > 280):
        tweets = tweet_parser(g)
        print(tweets)
        prev_id = 0
        tweet_info = ""
        for i in range(len(tweets)):   
            if (i == 0):
                if (isReply):
                    try:
                        post_tweet = api.update_status(status=tweets[i], in_reply_to_status_id=replyID, auto_populate_reply_metadata=True)
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
                        post_tweet = api.update_status(status=tweets[i])
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
                    post_tweet = api.update_status(status=tweets[i], in_reply_to_status_id=prev_id, auto_populate_reply_metadata=True)
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
                
                
            tweet_info = json.dumps(post_tweet._json, ensure_ascii = False, indent = 4)
            new_tweet_info = json.loads(tweet_info)
            prev_id = new_tweet_info["id"]
        return response_generator(200, "Multi-tweet success") #tweet_info
    else:
        #Single Tweet
        if (isReply):
            try:
                post_tweet = api.update_status(g, in_reply_to_status_id=replyID, auto_populate_reply_metadata=True)
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
                post_tweet = api.update_status(g)
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
        tweet_info = json.dumps(post_tweet._json, ensure_ascii = False, indent = 4)
        return response_generator(200, "Single-tweet success") #tweet_info

#tweet_parser parses the tweets and splits up a long messages into a formatted thread of tweets.
#reutrns list messages, which contains a tweet messgae within 280 characters
def tweet_parser(message):
    messages = []
    i = 0
    word_temp = {"pos": 0, "word":""}
    while i < len(message):
        message_temp = ""
        while (len(message_temp) + len(word_temp) + 8 < charLimit) and i < len(message):
            message_temp += word_temp["word"] + " "
            i = word_temp["pos"]
            word_temp = word_parser(i, message)
        messages.append(message_temp)
    for j in range(len(messages)):
        messages[j] = messages[j] + "[" + str((j + 1)) + "/" +  str(len(messages)) + "]"
    return messages

#word_parser will go through the provided string, starting at position i, and find a word whitespaced by spaces. The function returns the new position and word.
def word_parser(i, message):
    word_temp = ""
    j = i
    k = 0
    while (j < len(message) and message[j] == ' '):
        j += 1
    while (k < 272 and j < len(message) and message[j] != " "):
        word_temp += message[j]
        j += 1
        k += 1
    j += 1
    result = dict(pos=j, word=word_temp)
    return result
    
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
    output = PostTweet(event['body'])
    return output