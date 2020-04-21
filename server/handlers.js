'use strict';
const { MongoClient } = require('mongodb');
require('dotenv').config();

const getSeats = async (req, res) => { };


const uri = process.env.REACT_APP_DB_CONNECTION
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });


const getSeats = async (req, res) => {

    try {
        await client.connect();
        const db = client.db("mongo-continued");
        await db.collection("four").find().toArray((err, result) => {
            // console.log(result);
            if (result.length > 1) {
                const toReturnSeats = {};
                result.forEach(item => {
                    toReturnSeats[item._id] = item
                })
                // console.log(seats);

                return res.json({
                    seats: toReturnSeats,
                    numOfRows: 8,
                    seatsPerRow: 12,
                })
            }
        });
    }
    catch (e) {
        console.log(`error connection: ${e.stack}`)
    }

};



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
        await db.collection("four").insertMany(seats);

    } catch (e) {
        console.log(e.stack)
    }

}

// addSeatsToDb();


const checkDb = async () => {
    console.log("CHECKING")

    try {
        await client.connect();
        const db = client.db("mongo-continued");
        await db.collection("four").find().toArray((err, result) => {
            // console.log(result);
            if (result.length < 2) {
                addSeatsToDb()
            } else {

            }
        });
    }
    catch (e) {
        console.log(`error connection: ${e.stack}`)
    }
}

// checkDb();

const bookSeat = async (req, res) => {

    const { seatId, creditCard, expiration, fullName, email } = req.body;


    if (!creditCard || !expiration) {
        return res.status(400).json({
            status: 400,
            message: 'Please provide credit card information!',
        });
    } else {

        try {
            await client.connect();
            const db = client.db("mongo-continued");
            await db.collection("four").updateOne({ _id: `${seatId}` }, {
                $set: {
                    isBooked: true,
                    fullName: fullName,
                    email: email,

                }
            });

            return res.status(200).json({
                status: 200,
                success: true,
            });
        }
        catch (err) {
            console.log(`could not update seat data ${err.stack}`);

            return res.status(500).json({
                status: 500,
                success: false
            })
        }

    }

}

module.exports = { getSeats, checkDb, bookSeat };
