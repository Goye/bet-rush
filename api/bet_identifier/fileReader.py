from collections import deque
import random
import time
import config
import mongo_writer

if __name__ == '__main__':

    sleep_time = 5

    with open(config.filename) as f:
        content = f.readlines()

    results = deque([])
    event_count = 0 

    while (True):
        prob = random.uniform(0.0, 1.0)

        millis = str(int(round(time.time() * 1000)))[-5:]
        
        if prob < 0.5:
            event_count = (event_count + 1) %len(content)
            
            event = content[event_count]

            data =  event.split('|')
        
            my_dict = dict()

            my_dict['text'] = data[0]
            my_dict['id'] = millis

            mongo_writer.process_event(my_dict)
            
            results.append([millis, data[1]])

            #print("tweet posted " + millis)

            time.sleep(sleep_time)
        else :
            if len(results) > 0:
                result = results.popleft()
                #print result[0], result[1]

                my_dict['text'] = result[1]
                my_dict['id'] = millis
                my_dict['in_reply_to_status_id'] = result[0]

                mongo_writer.process_event(my_dict)
                time.sleep(sleep_time)

        



