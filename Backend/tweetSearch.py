from Essentials import *
import tweepy
import json


def searchTweet():
    # Takes query from front end and returns 20 (changeable) Tweets from the "Recent" filter and appends Date,ID,
    # Text, Names, and URLS into JSON Object while writing object into .JSON file.
    tweetSearch = input("Search Twitter...\n")
    tweets = []
    f = open("Tweet.json", "w")
    for tweet in api.search_tweets(q=tweetSearch, count='20', result_type='recent'):
        data = [tweet.id, tweet.text, tweet.user._json['screen_name'], tweet.user._json['name'],
                tweet.user._json['created_at'], tweet.entities['urls']]
        data = json.dumps(data, indent = 4, default = str)
        f.write(data)
        tweets.append(data)
    f.close
#    print (tweets)
    return tweets


def lambda_handler(event, context):
    searchTweet()
