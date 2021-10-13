from Essentials import *

def ReadTweet():
    #Hardcode for now, gets tweet ID when tweet obj is clicked
    remaining_rate = api.rate_limit_status()
    #print(remaining_rate['resources']['statuses'])
    if remaining_rate['resources']['statuses']['/statuses/show/:id']['remaining'] > 0:
        clicked_tweet = 1446643808393850883
        read_tweet = api.get_status(clicked_tweet)
        tweet_info = json.dumps(read_tweet._json, ensure_ascii = False, indent = 4)
        return tweet_info
    else:
        print("Rate Limited. Please wait 15 minutes.")
        time.sleep(15 * 60)
    
def lambda_handler(event, context):
    ReadTweet()

#ReadTweet()