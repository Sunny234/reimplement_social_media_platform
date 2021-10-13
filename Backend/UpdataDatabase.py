from Essentials import *    

def UpdateDatabase():
    remaining_rate = api.rate_limit_status()
    if remaining_rate['resources']['statuses']['/statuses/user_timeline']['remaining'] > 0:
        twts = api.user_timeline()
        twt_IDs = []
        for status in twts:
            data = twts[0]
            f = json.dumps(data._json)
            twtID = json.loads(f)
            twt_IDs.append(twtID["id"])
            
        accountID = twtID["user"]["id"]
        twtHandler = twtID["user"]["screen_name"]
        userFullname = twtID["user"]["name"]
        
        table = dynamodb_init.Table('user_info')
        table.put_item(
            Item = {
            "account_id" : accountID,            
            "fullname" : userFullname,
            "handle" : twtHandler,
            "tweets" : twt_IDs
        })

def lambda_handler(event, context):
    UpdateDatabase()

#UpdateDatabase()