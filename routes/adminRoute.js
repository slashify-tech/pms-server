const express = require('express');
const router = express.Router();

const { getPendingPolicy, updatePolicyStatus,  disablePolicy, getCancelledPolicy, getAllPolicy, getAllPolicyCount, getCancelledPolicyCount, downloadPolicyCsv } = require("../controllers/PoliciesController");
const { addAgent, getMBagent, getMGagent, deleteAgent, getUserDataByBrand } = require("../controllers/UserController");
const { authCheck } = require('../middleware/Auth');
const { downloadTopPerformerCsv } = require('../controllers/teamDataController');

    router.post("/add-new-agent", authCheck,  addAgent);
    router.put("/policyStatus", authCheck,  updatePolicyStatus)
    router.put("/cancelPolicy/:policyId", authCheck,  disablePolicy)

    router.delete("/deleteAgent/:id", authCheck,  deleteAgent)
    router.get("/mb-agents",  authCheck, getMBagent);
    router.get("/mg-agents", authCheck,  getMGagent);
    router.get("/team-members", authCheck,  getUserDataByBrand);
    router.get("/pendingPolicy",  authCheck, getPendingPolicy)
    router.get("/get-cancelled-policy", authCheck,  getCancelledPolicy)
    router.get("/get-all-policy", authCheck,  getAllPolicy)
    router.get("/getPolicy-count", authCheck,  getAllPolicyCount)
    router.get("/getCancelledPolicy-count", authCheck,  getCancelledPolicyCount)
    router.get("/downloadCSV",downloadPolicyCsv)
    router.get("/download-top-perofrmer-list", downloadTopPerformerCsv)


     

    
    module.exports = router;