from pymongo import MongoClient
import json

client = MongoClient('localhost', 27017)
db = client.betrush
events = db.event
events.remove()
