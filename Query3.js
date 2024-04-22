import { MongoClient } from 'mongodb';

// Query3: (10pts) Who is the person that got the most tweets?

// Queries derived in part using ChatGPT and edited where appropriate.

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

async function main() {
    const client = await MongoClient.connect(
        'mongodb://localhost:27017/'
    );

    const coll = client.db('ieeevis2020Tweets').collection('tweets');
    const cursor = coll.find({}, { "user.screen_name": 1 });

    const userTweets = {}; // Initialize as an object instead of 0

    await cursor.forEach(tweet => {
        const screenName = tweet.user.screen_name;
        if (!userTweets[screenName]) {
            userTweets[screenName] = 1; // Initialize count to 1
        } else {
            userTweets[screenName]++; // Increment tweet count
        }
    });

    let maxTweets = 0;
    let maxUser = '';

    for (const screenName in userTweets) {
        if (userTweets[screenName] > maxTweets) {
            maxTweets = userTweets[screenName];
            maxUser = screenName;
        }
    }

    console.log("Person with the most tweets is ", maxUser, " with ", maxTweets, " total tweets.");

    client.close(); // Close the MongoDB connection
}

main();
