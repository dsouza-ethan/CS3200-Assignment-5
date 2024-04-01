import { MongoClient } from 'mongodb';

// Query1: (10pts) How many tweets are not retweets or replies? (hint the field retweeted_status contains an object when the tweet is a retweeet)

// Queries derived in part using ChatGPT and edited where appropriate.

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const filter = {
  '$and': [
    {
      'retweeted_status': {
        '$exists': false
      }
    }, {
      'in_reply_to_status_id': {
        '$eq': null
      }
    }
  ]
};

const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
);
const coll = client.db('Assignment5').collection('tweets');
const cursor = coll.find(filter);
const result = await cursor.toArray();
await client.close();