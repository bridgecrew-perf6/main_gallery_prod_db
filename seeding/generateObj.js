const faker = require('faker');
const fs = require('fs');

const mongoose = require('mongoose');

// mongoose.connect(
//   'mongodb://localhost/SDC',
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );

// Generates object with random values.
const generateObject = (listingId) => {


  // Generate random data for each field and add to string...

  // Price
  const price = (Math.floor((Math.random() * 100) + 45)) * 10000;


  // Address
  const addr = faker.address;

  const streetNum = JSON.stringify(Math.floor(Math.random() * 10000));
  const streetName = addr.streetName();
  const streetSuff = addr.streetSuffix();
  const street = streetNum + ' ' + streetName + ' ' + streetSuff;

  const city = addr.city();
  const state = addr.stateAbbr();
  const zip = Math.floor((Math.random() * 90000) + 10000)

  // Tags
  const tagsArr = [
    {new: true},
    {sale: true},
    {sold: true},
    {construction: true},
  ];
  const tags = tagsArr[Math.floor(Math.random() * 4)];



  const obj = {
    listingId: listingId,
    price: price,
    address: {
      street: street,
      city: city,
      state: state,
      zip: zip
    },
    tags: tags,
    images: []
  }

  // Image generation
  const rand = Math.floor((Math.random() * 3) + 12);

  const generateImgs = (n) => {
    for (let i = 0; i < n; i++) {
      obj.images.push('https://loremflickr.com/320/240/house');
    }
  };

  generateImgs(rand);


  const line = JSON.stringify(obj) + '\n';

  return line;

  // fs.appendFile('test.json', line, (err) => {
  //   if (err) console.log(err);
  //   console.log('Line written!')
  // });
}

//console.log(generateObject(1))

// const writeLines = (quota) => {
//   for (let i = 1; i <= quota; i++)
//     generateObject(i);
// }

// writeLines(10000);




// ====================

const writeStream = fs.createWriteStream('seeding/seed.json');

function writeTenMillionTimes(encoding, callback) {
  let i = 10000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      // Progress tracker
      if (i % 25000 === 0) {
        console.log(i);
      }
      if (i === 0) {
        // Last time!
        writeStream.write(generateObject(i), encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writeStream.write(generateObject(i), encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writeStream.once('drain', write);
    }
  }
}

// Write To A Stream:
  // make a stream in a var
  //
  writeTenMillionTimes('utf-8', () => {
    console.log('Done!')
  })