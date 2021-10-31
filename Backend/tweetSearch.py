import tweepy
import json
import os

def searchTweet(search_query):
    c = os.environ['API_KEY']
    d = os.environ['API_KEY_SECRET']
    e = os.environ['ACCESS_TOKEN']
    f = os.environ['ACCESS_TOKEN_SECRET']
    auth = tweepy.OAuthHandler(c, d)
    auth.set_access_token(e, f)
    api = tweepy.API(auth, wait_on_rate_limit=True)
    tweetSearch = search_query
    tweets = []
    for tweet in api.search_tweets(q=search_query, count='20', result_type='recent'):
        data = [tweet.id, tweet.text, tweet.user._json['screen_name'], tweet.user._json['name'],
                tweet.user._json['created_at'], tweet.entities['urls']]
        data = json.dumps(data, ensure_ascii = False, indent = 4, default = str)
        tweets.append(data)
    return tweets

def lambda_handler(event, context):
    return {
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
        'statusCode': 200,
        'body': searchTweet(event['body'])
    }