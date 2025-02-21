const express = require('express');
const router = express.Router();
const {
  getDocumentData,
  updateDocumentStatus,
  getStatusRequestForAgent,
  sendPolicyPdf,
  CustomerApproval,
} = require("../controllers/documentController");
const { authCheck } = require('../middleware/Auth');

router.patch("/document-status-update", authCheck, updateDocumentStatus);
router.patch("/customer-document-approval", sendPolicyPdf); 
router.patch("/customer-approval", authCheck, CustomerApproval); 

router.get("/all-document", authCheck, getDocumentData);
router.get("/agent-document-approval", authCheck, getStatusRequestForAgent);

module.exports = router;
