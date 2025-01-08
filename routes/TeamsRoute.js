const express = require('express');
const router = express.Router();
const {
  getTeamData,
  updateTeamData,
} = require("../controllers/teamDataController");


  router.get("/api/v1/getTeams", getTeamData);
  router.patch("/api/v1/update-team", updateTeamData);
  module.exports = router;
