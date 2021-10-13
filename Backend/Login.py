from Essentials import *
import oauth2 as oauth
import urllib.request
import urllib.parse
import urllib.error

def Login():
    request_token_url = 'https://api.twitter.com/oauth/request_token'

    oauth_store = {}

    consumer = oauth.Consumer(API_KEY, API_KEY_SECRET)
    client = oauth.Client(consumer) 

    resp, content = client.request(request_token_url, "POST")
    if resp['status'] != '200':
        print("Invalid response, Status {status}".format(status = resp['status']))
    else:
        pass

    request_token = dict(urllib.parse.parse_qsl(content))

    oauth_token = request_token[b"oauth_token"].decode('utf-8')
    oauth_token_secret = request_token[b"oauth_token_secret"].decode('utf-8')
    oauth_store[oauth_token] = oauth_token_secret

    token = oauth.Token(oauth_token, oauth_token_secret)
    client = oauth.Client(consumer, token)

    print(oauth_store)

    del oauth_store[oauth_token]

def lambda_handler(event, context):
    Login()

#Login()