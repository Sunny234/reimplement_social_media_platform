import tweepy
import json
import os

charLimit = 280

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
        tweets = tweet_parser(message)
        prev_id = 0
        tweet_info = ""
        for i in range(len(tweets)):   
            if (i == 0):
                if (isReply):
                    post_tweet = api.update_status(status=tweets[i], in_reply_to_status_id=replyID, auto_populate_reply_metadata=True)
                else:
                    post_tweet = api.update_status(status=tweets[i])
            else:
                post_tweet = api.update_status(status=tweets[i], in_reply_to_status_id=prev_id, auto_populate_reply_metadata=True)
                
            tweet_info = json.dumps(post_tweet._json, ensure_ascii = False, indent = 4)
            new_tweet_info = json.loads(tweet_info)
            prev_id = new_tweet_info["id"]
        return json.dumps({"message":"Multi-tweet success"}) #tweet_info
    else:
        #Single Tweet
        print(g)
        post_tweet = api.update_status(g)
        tweet_info = json.dumps(post_tweet._json, ensure_ascii = False, indent = 4)
        return json.dumps({"message":"Single-tweet success"}) #tweet_info

#tweet_parser parses the tweets and splits up a long messages into a formatted thread of tweets.
#reutrns list messages, which contains a tweet messgae within 280 characters
def tweet_parser(message):
    messages = []
    i = 0
    word_temp = {"pos": 0, "word":""}
    while i < len(message):
        message_temp = ""
        while (len(message_temp) + len(word_temp) < charLimit) and i < len(message):
            message_temp += word_temp["word"] + " "
            i = word_temp["pos"]
            print(i)
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

def lambda_handler(event, context):
     return {
            'statusCode' : 200,
            'headers' : {
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods" : "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT"
            },
            'body': PostTweet(event['body']),
            'isBase64Encoded': False
        }