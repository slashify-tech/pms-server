const express = require("express");
const router = express.Router();
const {
  updatePolicyStatus,
  policyFormData,
  getPolicyById,
  getFilteredPolicyById,
  editPolicy,
  policyResubmit,
  getPolicies,
  getSalesData,
  getMbclassAndModel,
  addNewModel,
  getExpiredWarrantyCount,
  getExpiredPolicy
} = require("../controllers/PoliciesController");
const { authCheck } = require("../middleware/Auth");

router.post("/add-policies", authCheck, policyFormData);
router.post("/add-policies", authCheck, policyFormData);
router.post("/new-model", authCheck, addNewModel);

router.patch("/policy-resubmit", authCheck, policyResubmit);
router.patch("/edit-policies/:id", authCheck, editPolicy);

router.get("/policyById/:id", authCheck, getPolicyById);
router.get("/policy", authCheck, getPolicies);
router.get("/filtered-policyById/:id", authCheck, getFilteredPolicyById);
router.get("/sales-overview", authCheck, getSalesData);
router.get("/expired-policy-data", authCheck, getExpiredWarrantyCount);
router.get("/mb-class-data", authCheck, getMbclassAndModel);
router.get("/expired-policy-lists", authCheck, getExpiredPolicy);



module.exports = router;
