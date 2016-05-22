from tweepy import OAuthHandler
from collections import deque
import random
import time
import tweepy
import config

if __name__ == '__main__':

    sleep_time = 5

    auth = OAuthHandler(config.consumer_key, config.consumer_secret)
    auth.set_access_token(config.access_token, config.access_secret)
    
    api = tweepy.API(auth)

    with open(config.filename) as f:
        content = f.readlines()

    results = deque([])
    event_count = 0 

    while (True):
        prob = random.uniform(0.0, 1.0)

        millis = str(int(round(time.time() * 1000)))[-5:]
        
        if prob < 0.6:
            event_count = (event_count + 1) %len(content)
            
            event = content[event_count]

            data =  event.split('|')
        
            status = millis + " " + data[0]

            tweet = api.update_status(status=status)
            
            place_id = tweet._json['id_str']

            results.append([place_id, data[1]])

            print("tweet posted " + place_id)
        else :
            if len(results) > 0:
                result = results.popleft()
                print result[0], result[1]

                status = millis + " " + result[1]

                api.update_status(status=status, in_reply_to_status_id=result[0])

        time.sleep(sleep_time)



