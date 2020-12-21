const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/SDC',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const listingSchema = mongoose.Schema({
  listingId: Number,
  price: Number,
  address: {
    street: String,
    city: String,
    state: String,
    zip: Number
  },
  tags: {
    new: Boolean,
    sale: Boolean,
    sold: Boolean,
    construction: Boolean,
  },
  images: [String]
});

const ListingModel = mongoose.model('Listing', listingSchema);

// METHODS HERE ---
module.exports = {

  fetchOne: (num, callback) => {
    ListingModel.find({listingId:num}, callback)
  },

  insertOne: (listing, callback) => {
    ListingModel.create(listing, (err) => {
      if (err) {
        console.log(err);
      }
      callback()
    })
  }
}
// ----------------

module.exports.ListingModel = ListingModel; // necessary?


// mongo stores as json

// import from csv to mongo using method
// csv need field headers
  // headers are keys
  // lines are values
// how to handle nested?

// UPDATED PLAN

// creating csv
  // generate random data Subfunction
      // stringify arrays and objects
      // create obj stringify then save to csv
      // concat to one string
  // append long string to file
// edge cases, arrays objects

// importing to mongo, (doesn't scale well)
  // splitting entire file into array of lines
  // iterating over the lines array
  // assigning each index to values of and object
  // insert that object into mongo collection

  // import csv to mongo
  // parse string to array and object with json parse