import tweepy, os, sys
import boto3, botocore
import json, time

def get_keys(path):
    with open(path) as f:
        return json.load(f)

API_KEYS = get_keys("Backend/.secret/Keys.json")
SECRET = API_KEYS['AWS']['AWS_ACCESS_KEY']

#AWS keys
AWS_ACCESS_KEY = API_KEYS['AWS']['AWS_ACCESS_KEY'] 
AWS_ACCESS_KEY_SECRET = API_KEYS['AWS']['AWS_ACCESS_KEY_SECRET']

#Twitter API keys
API_KEY = API_KEYS['Twitter']['API_KEY']
API_KEY_SECRET = API_KEYS['Twitter']['API_KEY_SECRET']
BEARER_TOKEN = API_KEYS['Twitter']['BEARER_TOKEN']
ACCESS_TOKEN = API_KEYS['Twitter']['ACCESS_TOKEN']
ACCESS_TOKEN_SECRET = API_KEYS['Twitter']['ACCESS_TOKEN_SECRET']

#authentication
auth = tweepy.OAuthHandler(API_KEY, API_KEY_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
api = tweepy.API(auth, wait_on_rate_limit = True)


#s3 Bucket obj
s3_bucket = boto3.client(
    's3',
    aws_access_key_id = AWS_ACCESS_KEY,
    aws_secret_access_key = AWS_ACCESS_KEY_SECRET
)

#DynamoDB obj
dynamodb_init = boto3.resource(
    'dynamodb',
    aws_access_key_id = AWS_ACCESS_KEY,
    aws_secret_access_key = AWS_ACCESS_KEY_SECRET
)

table = dynamodb_init.Table('user_info')

#-------------------------------------------------------
#                       Functions
#-------------------------------------------------------

def upload_to_bucket(file_name, bucket, object_name = None):
    if object_name is None:
        object_name = os.path.basename(file_name)

    s3_bucket.upload_file(file_name, bucket, object_name)


def download_from_bucket(bucket, object_key, filename):
    try:    
        s3_bucket.download_file(bucket, object_key, filename)
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            print("The object you are looking for does not exist.")
        else:
            raise

'''
remaining_rate = api.rate_limit_status()
print(remaining_rate['resources']['statuses'])
'''