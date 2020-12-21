const faker = require('faker');
const fs = require('fs');

const generateListingLine = (listingId) => {
  let listingString = ``;

  // Generate random data for each field and add to string...

  // Price
  const price = (Math.floor((Math.random() * 100) + 45)) * 10000;


  // Address
  const addr = faker.address;

  const streetNum = JSON.stringify(Math.floor(Math.random() * 10000));
  const streetName = addr.streetName();
  const streetSuff = addr.streetSuffix();

  const street = streetNum + ' ' + streetName + ' ' + streetSuff;

  const zip = Math.floor((Math.random() * 90000) + 10000);

  // ${streetNum}, ${streetName}, ${streetSuff}
  //const address = `${street}, ${addr.city()}, ${addr.stateAbbr()}, ${zip}`;
  const address = '"' + street + '", "' + addr.city() + '", "' +addr.stateAbbr() + '", ' + zip;


  // Tags
  // const flags = [false, false, false, false];
  // MUST BE 1 FOR TRUE 0 FOR FALSE
  const flags = [0, 0, 0, 0];
  flags[Math.floor(Math.random() * 4)] = 1;

  const tags = `${flags[0]},  ${flags[1]},  ${flags[2]},  ${flags[3]}`;





  listingString = 0 + ', ' + price + ', '  + address + ', ' + tags + '\n';

  // fs.appendFile('./seeding/listingSeed.csv', listingString, (err) => {
  //   if (err) console.log(err);
  //   console.log('Listing written!')
  // });


  // fs.appendFile('./seeding/imageSeed.csv', imageString, (err) => {
  //   if (err) console.log(err);
  //   console.log('Image line written!')
  // });

  return listingString;
}

console.log(generateListingLine(1))

  // ====================

  // Images
const generateImgLine = (listingId) => {
  const rand = Math.floor((Math.random() * 3) + 12);
  let imageString = '';

  for (let i = 0; i < rand; i++) {
    imageString += (0 + ', ' + 'https://loremflickr.com/320/240/house' + ',' + listingId + '\n');
  }
  return imageString;
};

const listingStream = fs.createWriteStream('seeding/listingSeed.csv');
const imageStream = fs.createWriteStream('seeding/imageSeed.csv');

// CSV HEADER. NEED???
// listingId, price, street, city, state, zip, new, sale, sold, construction

function writeNtimes(n, encoding, callback) {
  let i = 0;
  write();
  function write() {
    let ok = true;
    do {
      i++
      // Progress tracker
      if (i % 25000 === 0) {
        console.log(i);
      }
      if (i === n) {
        // Last time!
        listingStream.write(generateListingLine(i), encoding, callback);
        imageStream.write(generateImgLine(i), encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = listingStream.write(generateListingLine(i), encoding);
        ok = imageStream.write(generateImgLine(i), encoding);
      }
    } while (i < n && ok);

    if (i < n) {
      // Had to stop early!
      // Write some more once it drains.
      listingStream.once('drain', write);
      imageStream.once('drain', write);
    }
  }
}

// Write To A Stream:
  // make a stream in a var
  //
  writeNtimes(10000000, 'utf-8', () => {
    console.log('Done!')
  })

  // const images = generateImgs(rand);
  // imageString = images;

  // ====================

// ====================

// const writeStream = fs.createWriteStream('seed.csv');
// writeStream.write('id,username,avatar\n', 'utf8');

// function writeTenMillionUsers(writer, encoding, callback) {
//   let i = 10000000;
//   let id = 0; // data gen
//   function write() {
//     let ok = true;
//     do {
//       i -= 1;
//       id += 1; // data gen
//       const username = faker.internet.userName(); // data gen
//       const avatar = faker.image.avatar(); // data gen
//       const data = `${id},${username},${avatar}\n`; // data gen
//       if (i === 0) {
//         writer.write(data, encoding, callback);
//       } else {
// // see if we should continue, or wait
// // don't pass the callback, because we're not done yet.
//         ok = writer.write(data, encoding);
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
// // had to stop early!
// // write some more once it drains
//       writer.once('drain', write);
//     }
//   }
// write()
// }

// writeTenMillionUsers(writeStream, 'utf-8', () => {
//   writeStream.end();
// });



// function writeTenMillionTimes(encoding, callback) {
//   let i = 10;
//   write();
//   function write() {
//     let ok = true;
//     do {
//       i--;
//       // Progress tracker
//       if (i % 25000 === 0) {
//         console.log(i);
//       }
//       if (i === 0) {
//         // Last time!
//         listingStream.write(generateListingLine(i), encoding, callback);
//         imageStream.write(generateImgLine(i), encoding, callback);
//       } else {
//         // See if we should continue, or wait.
//         // Don't pass the callback, because we're not done yet.
//         ok = listingStream.write(generateListingLine(i), encoding);
//         ok = imageStream.write(generateImgLine(i), encoding);
//       }
//     } while (i > 0 && ok);

//     if (i > 0) {
//       // Had to stop early!
//       // Write some more once it drains.
//       listingStream.once('drain', write);
//       imageStream.once('drain', write);
//     }
//   }
// }