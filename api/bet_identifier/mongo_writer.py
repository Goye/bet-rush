from pymongo import MongoClient
import json

client = MongoClient('localhost', 27017)
db = client.betrush
events = db.event

def process_event(status):
	#TODO delete this comment	
	#status = json.loads(status)
	event = {}
	event['tweet_id'] = status["id"]
	print "before Mongo: ", event
	kind, additions = filter_status(status)
	if kind == 'open':
		event.update(additions)
		create_event(event)
	elif kind == 'closed':
		close_event(additions)
	print "After Mongo: ", event


def create_event(event):
	event_id = events.insert_one(event).inserted_id
	print("Event successfully entered in db with id {}".format(event_id))

def close_event(winning_options):
	write_results = events.update_one({'tweet_id': winning_options['original_id']},{
		'$set': {
			'results': winning_options['results']
		}})

	print("Event successfully updated: {}".format(write_results))
	
def filter_status(status):
	tweet = status["text"]
	open_bet = "#PlaceBet"
	close_bet = "#BetsRClosed"
	tag_location = tweet.find(open_bet)
	if tag_location != -1:
		kind = "open"
		category, event, options = tweet[tag_location + len(open_bet):].split()
		options = options.split('-')
		return kind, {
			'category':category,
			'event':event,
			'options':options
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