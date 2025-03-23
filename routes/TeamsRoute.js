const express = require("express");
const router = express.Router();
const {
  getTeamData,
  updateTeamData,
  topPerformerLists,
    topLeadLists,
} = require("../controllers/teamDataController");
const { authCheck } = require("../middleware/Auth");

router.get("/getTeams", authCheck,  getTeamData);
router.patch("/update-team",  authCheck, updateTeamData);
router.get("/top-performer-lists",  authCheck, topPerformerLists);
router.get("/top-lead-performer-lists", authCheck, topLeadLists);
module.exports = router;
