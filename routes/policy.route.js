const { updatePolicyStatus, policyFormData, getPolicyById, getFilteredPolicyById, editPolicy, policyResubmit, getPolicies } = require("../controllers/PoliciesController");

module.exports = (app) => {
  app.post("/api/v1/add-policies", policyFormData);
  app.post("/api/v1/approval", updatePolicyStatus);
  app.patch("/api/v1/policy-resubmit", policyResubmit)
  app.patch("/api/v1/edit-policies/:id", editPolicy);
  app.get("/api/v1/policyById/:id", getPolicyById)
  app.get("/api/v1/policy", getPolicies)

  app.get("/api/v1/filtered-policyById/:id", getFilteredPolicyById)


};
