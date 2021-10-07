from Essentials import *
import json
import time

def LoadTimeline():
    #Checks remaining rate limit and fetches timeline if possible
    remaining_rate = api.rate_limit_status()
    if remaining_rate['resources']['statuses']['/statuses/user_timeline']['remaining'] > 0:
        cursor = api.user_timeline()
        fetchedUserTimeline = []
    else:
        print("Limit Reached. Please wait 15 minutes.")
        time.sleep(15 * 60)
        
    '''
    For Debugging, Prints info about rate limit of user_timeline()
    print(remaining_rate['resources']['statuses']['/statuses/user_timeline'])
    '''

    #Converts status obj to json obj and writes json obj to a .json file
    for i in range(len(cursor)):
        userTweet = cursor[i]
        json_str = json.dumps(userTweet._json, ensure_ascii = False, indent = 4)
        f = open("Tweet {}.json".format(i + 1), "w")
        f.write(json_str)
        f.close
        #Appends json files to a list of files, creating a timeline
        fetchedUserTimeline.append(f)

    #Uploads json files to s3 Bucket and delete copy on computer
    for j in range(len(cursor)):
        upload_to_bucket("Tweet {}.json".format(j + 1), "rsmdump", "twt {}.json".format(j + 1))
        os.remove("Tweet {}.json".format(j + 1))
    
    '''
    Front-end does something with the fetchUserTimeline to display it
    '''

    #Debug to see if json files got appended to fetchUserTimeline 
    #print(fetchedUserTimeline)

    #Deletes json files from s3 Bucket after use
    s3_bucket_temp = boto3.resource('s3')
    for k in range(len(cursor)):
        s3_bucket_temp.Object("rsmdump", "twt {}.json".format(k + 1)).delete()

    return fetchedUserTimeline()

#Required to function with AWS Lambda
def lambda_handler(event, context):
    LoadTimeline()

#For testing code on local machine
#LoadTimeline()