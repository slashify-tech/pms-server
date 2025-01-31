const mongoose = require('mongoose')
const TeamData = require('../TeamData');
const connectDb = require('../db/mongoConnection');
const Teams = require('../model/TeamsModel');

async function insertTeamData() {
  try {
    await connectDb();

    await Teams .insertMany(TeamData);
    console.log('teamdata inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    mongoose.connection.close();
  }
}

insertTeamData();
