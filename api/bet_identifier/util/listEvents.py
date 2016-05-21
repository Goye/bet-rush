from pymongo import MongoClient
import json

client = MongoClient('localhost', 27017)
db = client.betrush
events = db.event
for event in events.find():
    print(event)
