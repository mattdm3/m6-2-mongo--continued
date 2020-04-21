const fs = require('file-system');
const { MongoClient } = require('mongodb');
// const assert = require('assert');
const env = require('dotenv/config');

// const env = dotenv.config().parsed;
// const uri = env.DB_CONNECTION;
// const client = new MongoClient("mongodb+srv://matteo:6724@testcluster1-wfwr8.mongodb.net/exercises", { useUnifiedTopology: true });



const uri = "mongodb+srv://matteo:6724@testcluster1-wfwr8.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });

// client.connect(err => {
//     const collection = client.db("mongo-continued").collection("one");
//     console.log(collection)
//     // perform actions on the collection object

//     client.close();
// });



const addSeatsToDb = async () => {

    const seats = [];
    const row = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    for (let r = 0; r < row.length; r++) {
        for (let s = 1; s < 13; s++) {
            // seats[`${row[r]}-${s}`] = {
            seats.push({
                //added the _id
                _id: `${row[r]}-${s}`,
                price: 225,
                isBooked: false,
            });
        }
    }


    try {
        await client.connect();
        const db = client.db("mongo-continued");
        await db.collection("one").insertMany(seats);
        console.log(db.collection("one"))

    } catch (e) {
        console.log(e.stack)
    }

}
// addSeatsToDb()

const checkDb = async () => {

    try {
        await client.connect();
        const db = client.db("mongo-continued");
        await db.collection("one").find().toArray((err, result) => {
            console.log(result);
            if (!result) {
                addSeatsToDb()
            }
        });
    }
    catch (e) {
        console.log(`error connection: ${e.stack}`)
    }
}

checkDb(); 