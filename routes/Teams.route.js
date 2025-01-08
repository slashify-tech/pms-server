const {
  getTeamData,
  updateTeamData,
} = require("../controllers/teamData.controller");

module.exports = (app) => {
  app.get("/api/v1/getTeams", getTeamData);
  app.patch("/api/v1/update-team", updateTeamData);
};
