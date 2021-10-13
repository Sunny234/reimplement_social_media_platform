from Essentials import *

def Retweet():
    remaining_rate = api.rate_limit_status()
    if remaining_rate['resources']['statuses']['/statuses/retweets/:id']['remaining'] > 0:
        remainder = remaining_rate['resources']['statuses']['/statuses/user_timeline']['remaining']
        if remainder > 0:
            twts = api.user_timeline()
            twt_IDs = []
            for status in twts:
                data = twts[0]
                f = json.dumps(data._json)
                userID = json.loads(f)
                twt_IDs.append(userID["id"])
                #retweet button should send tweetID to the retweet function
                api.retweet(1446643808393850883) #placeholder input for now
        else:
            print("Rate Limited for fetching user timeline. Please wait 15 minutes.")
            time.sleep(15 * 60)
    else:
            print("Rate Limited for retweeting. Please wait 15 minutes.")
            time.sleep(15 * 60)

def lambda_handler(event, context):
    Retweet()

#Retweet()