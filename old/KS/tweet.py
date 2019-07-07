import tweepy

consumer_key = "..."
consumer_secret = "..."
access_token = "..."
access_secret = "..."
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)
api = tweepy.API(auth)

def tweet(text):
    api.update_status(status=text)

if __name__ == "__main__":
    status = raw_input("Tweet: ")
    tweet(status)
