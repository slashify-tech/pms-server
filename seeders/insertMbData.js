const connectDb = require("../db/mongoConnection");
const mongoose = require('mongoose');
const mbListing = require("../mgListingData");
const { mbData } = require("../model/masterData");


connectDb()
  .then(() => {
    const data = [].concat.apply([], mbListing);

    return mbData.insertMany(data);
  })
  .then((insertedData) => {
    console.log("Data inserted successfully:", insertedData);
  })
  .catch((error) => {
    console.error("Error inserting course data:", error);
  })
  .finally(() => {
    mongoose.connection.close();
  });
