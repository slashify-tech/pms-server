const { getPendingPolicy, updatePolicyStatus,  disablePolicy, getCancelledPolicy, getAllPolicy, getAllPolicyCount, getCancelledPolicyCount, downloadPolicyCsv } = require("../controllers/PoliciesController");
const { addAgent, getMBagent, getMGagent, deleteAgent } = require("../controllers/UserController");

module.exports = (app)=>{
    app.post("/api/v1/add-new-agent", addAgent);
    app.put("/api/v1/policyStatus", updatePolicyStatus)
    app.put("/api/v1/cancelPolicy/:policyId", disablePolicy)

    app.delete("/api/v1/deleteAgent/:id", deleteAgent)

    app.get("/api/v1/mb-agents", getMBagent);
    app.get("/api/v1/mg-agents", getMGagent);
    app.get("/api/v1/pendingPolicy", getPendingPolicy)
    app.get("/api/v1/get-cancelled-policy", getCancelledPolicy)
    app.get("/api/v1/get-all-policy", getAllPolicy)
    app.get("/api/v1/getPolicy-count", getAllPolicyCount)
    app.get("/api/v1/getCancelledPolicy-count", getCancelledPolicyCount)
    app.get("/api/v1/downloadCSV",downloadPolicyCsv)


     

    
}