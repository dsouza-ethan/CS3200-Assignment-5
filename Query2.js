import {MongoClient} from 'mongodb';

// Query2: (10pts) Return the top 10 screen_names by their number of followers.

// Queries derived in part using ChatGPT and edited where appropriate.

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const client = await MongoClient.connect(
    'mongodb://localhost27017/'
);
const coll = client.db('ieeevis2020Tweets').collection('tweets');
const cursor = coll.find({}, {"user.screen_name": 1}, {"user.follower_count": 1}).sort({"user.followers_count": -1});
const result = await cursor.toArray();

console.log("Top 10 screen names by number of followers:", result);
await client.close();
