const router = require('express').Router();

const fs = require('file-system');
const { mongoClient } = require('mongodb');
// const assert = require('assert');
const dotenv = require('dotenv');

const { checkDb, getSeats, bookSeat } = require("./handlers")



// Code that is generating the seats.
// ----------------------------------
const seats = {};
const row = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
for (let r = 0; r < row.length; r++) {
  for (let s = 1; s < 13; s++) {
    seats[`${row[r]}-${s}`] = {
      //added the _id
      _id: `${row[r]}-${s}`,
      price: 225,
      isBooked: false,
    };
  }
}
// ----------------------------------

// router.get('/api/seat-availability', (req, res) => {
//   return res.json({
//     seats: seats,
//     numOfRows: 8,
//     seatsPerRow: 12,
//   });
// });

router.get('/api/seat-availability', getSeats)

// router.get('/login', handleLogin);

router.post('/api/book-seat', bookSeat);


router.post('/', checkDb);


router.get('/api/seat-availability', getSeats);

router.post('/api/book-seat', bookSeat);


module.exports = router;
