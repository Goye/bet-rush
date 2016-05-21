from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.betrush
events = db.events

def process_event(status):
	event = {}
	event['tweet_id'] = status.id
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
	event = events.find_one({'tweet_id': winning_options['original_id']})
	event['results'] = winning_options.results
	event_id = events.insert_one(event).inserted_id
	print("Event successfully updated in db with id {}".format(event_id))
	
def filter_status(status):
	tweet = status.text
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