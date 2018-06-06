import tweepy

consumer_key = "NMmC4LNUneGCjfzTpT7AzTDWo"
consumer_secret = "bdoiUaGhIqbM8MEoa987KZINY6mpOQgkLFDxghXkSaKesyI94l"
access_token = "3236648762-Agk1xJkEwNDSoNGX1MmNNPslVkDMbifx0gvsH1Z"
access_secret = "73HhyzHBlBchPxbzJFeJojbnwfXn34PHrOIF9glG3SrcT"
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)
api = tweepy.API(auth)

def tweet(text):
    api.update_status(status=text)

if __name__ == "__main__":
    status = raw_input("Tweet: ")
    tweet(status)
