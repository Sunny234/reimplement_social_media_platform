import tweepy, os
import boto3, botocore

#AWS keys
AWS_ACCESS_KEY = "AKIAUYDS5BNG6JM7AIBI"
AWS_ACCESS_KEY_SECRET = "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"
AWS_DEFAULT_REGION = "us-west-1"

#Twitter API keys
API_KEY = "tYAga0fPzoEXzwf3GZ9EzRIIJ"
API_KEY_SECRET = "xfrXLbK3Yezo7s0b8E9JwoSK4mBUWDvVAyy1spuefUWLsM226I"
BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAGL2TgEAAAAAHSZ8H0FqnrQ7a%2BKCsluw%2Fh%2FgAqM%3DmCPPvS4Fswv06ImVShW6HG6vlT1iRcpyVI3LKja8EZrF3YCxb3"
ACCESS_TOKEN = "1437922301371052038-Da4n64yb8jOiAbkNcghw3Vvvrk99J2"
ACCESS_TOKEN_SECRET = "1yswVuFWGfgkOmQW5XgRQQwvlzx7MZEdIzt2R0zj7nB1D"

#authentication
auth = tweepy.OAuthHandler(API_KEY, API_KEY_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
api = tweepy.API(auth,wait_on_rate_limit = True)

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