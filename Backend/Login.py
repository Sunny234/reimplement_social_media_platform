from Essentials import *
import webbrowser

def Login():
    callback_URL = "oob"
    login = tweepy.OAuthHandler(a['Item']['value'], b['Item']['value'], callback_URL)
    redirect_URL = login.get_authorization_url()
    print(redirect_URL)
    webbrowser.open(redirect_URL)
    validation_PIN = input("Enter PIN: ")
    tokens = login.get_access_token(validation_PIN)
    #print(tokens)
    #print(login.access_token, login.access_token_secret)
    return validation_PIN, tokens

def lambda_handler(event, context):
    Login()

#Login()