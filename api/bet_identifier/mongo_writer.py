from pymongo import MongoClient
import json
import categories
import time

client = MongoClient('localhost', 27017)
db = client.betrush
events = db.event
notifications = db.notification

def process_event(status):
	#TODO delete this comment	
	status = json.loads(status)
	event = {}
	event['socialId'] = str(status["id"])
	kind, additions = filter_status(status)
	if kind == 'open':
		event.update(additions)
		create_event(event)
	elif kind == 'closed':
		close_event(additions)


def create_event(event):
	event_id = events.insert_one(event).inserted_id
	print("Event successfully entered in db with id {}".format(event_id))

def close_event(winning_options):

	event = events.find_one({'socialId': str(winning_options['original_id'])})
	print event
	if(event):
		obj_id = event['_id']

		write_results = events.update_one({"_id": obj_id},{
			'$set': {
				'results': winning_options['results'],
				'closed': True
			}})

		not_id = notifications.insert_one({"eventId": obj_id}).inserted_id

		print("Event successfully updated: {} \n Notification: {}".format(write_results, not_id))
	
def filter_status(status):
	tweet = status["text"]
	open_bet = "#PlaceBet"
	close_bet = "#BetsRClosed"
	tag_location = tweet.find(open_bet)
	if tag_location != -1:
		kind = "open"
		category, event, options = tweet[tag_location + len(open_bet):].split()
		category = [categories.abbr.get(x) for x in category.split('-')]
		options = options.split('-')
		return kind, {
			'createdAt': time.time(),
			'category':category,
			'name':event,
			'options':options,
			'live': "60000",
			'closed': False
		}

	tag_location = tweet.find(close_bet)
	if tag_location != -1:
		kind= "closed"
		event, result = tweet[tag_location + len(close_bet):].split()
		return kind, {
		'original_id': status['in_reply_to_status_id'],
		'results':result.split('-')
		}

	#invalid
	return None, None