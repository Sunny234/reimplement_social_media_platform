from Essentials import *

def LoadTimeline():
    def FetchTimeline(cursor, timeline):
        #Converts status obj to json obj and writes json obj to a .json file
        for i in range(len(cursor)):
            userTweet = cursor[i]
            f = json.dumps(userTweet._json, ensure_ascii = False, indent = 4)
            #Appends json files to a list of files, creating a timeline
            timeline.append(f)
            twt = open("Tweet {}.json".format(i + 1), "w")
            twt.write(f)
            twt.close
        print(timeline)
        return timeline

    cursor = api.user_timeline()
    timeline = []
    FetchTimeline(cursor, timeline)
    
#Required to function with AWS Lambda
def lambda_handler(event, context):
    LoadTimeline()

#For testing code on local machine
LoadTimeline()