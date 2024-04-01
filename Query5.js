import { MongoClient } from 'mongodb';

// Query5: (30pts) Write the instructions that will separate the Users information into a different collection
// Create a user collection that contains all the unique users.
// Create a new Tweets_Only collection, that doesn't embed the user information, but instead references it using the user id

// Queries derived in part using ChatGPT and edited where appropriate.

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const coll = client.db('ieeevis2020Tweets').collection('tweets');
const cursor = coll.find({}, { "user.screen_name": 1 }).sort({ "user.followers_count": -1 });

async function separatedUsersAndTweets() {
    const client = await MongoClient.connect(
        'mongodb://localhost27017/'
    );
    const db = client.db('Assignment5');

    await aggregateAndMergeUsers(db);
    await aggregateAndMergeTweets(db);

    console.log("Successfully separated users and tweets.")
    await client.close();
}

async function aggregateAndMergeUsers(db){
    await db.collection('tweets').aggregate([
        {
            $group: {
                _id: "User.id",
                name: { $first: "$user.screen_name" },
                followers_count: { $first: "$user.followers_count" }
            }
        },
        { $merge: { into: "Users" } }
    ]).toArray();
}

async function aggregateAndMergeTweets(db){
    await db.collection('tweets').aggregate([
        {
            $project: {
                _id: 0,
                user_id: "$user.id",
                tweet: "$text"
            }
        },
        { $merge: { into: "Tweets_Only" } }
    ]).toArray();
}