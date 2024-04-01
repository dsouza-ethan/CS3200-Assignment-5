import { MongoClient } from 'mongodb';

// Query4: (25pts) Who are the top 10 people that got more retweets in average, after tweeting more than 3 times

// Queries derived in part using ChatGPT and edited where appropriate.

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const client = await MongoClient.connect(
    'mongodb://localhost27017/'
);

const coll = client.db('ieeevis2020Tweets').collection('tweets');
const cursor = coll.find({}, { "user.screen_name": 1 }, { "retweeted_status.retweet_count": 1});

const retweets = {};
await cursor.forEach(tweet => {
    const screenName = tweet.user.screen_name;
    const retweets = tweet.retweeted_status ? tweet.retweeted_status.retweet_count : 0;

    if(!retweets[screenName]) {
        retweets[screenName] = [];
    }

    retweets[screenName].push(retweets);
})

const filteredUsers = Object.entries(retweets)
    .filter(([_, retweets]) => retweets.length > 3)
    .map(([screenName, retweets]) => {
        const avgRetweets = retweets.reduce((acc, count) => acc + count, 0) / retweets.length;
        return { screenName, avgRetweets };
    })
    .sort((a, b) => b.avgRetweets - a.avgRetweets)
    .slice(0, 10);

console.log("Top 10 people who got more retweets on average after tweeting more than 3 times are the following:");
console.log(filteredUsers);
await client.close();