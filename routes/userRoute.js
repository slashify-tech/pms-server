const express = require("express");
const router = express.Router();
const { cancelFromAgentRequest } = require("../controllers/PoliciesController");
const {
  signinController,
  getUsersData,
  getUserById,
  getUserDataById,
  passwordUpdate,
  emailUpdate,
} = require("../controllers/UserController");
const { authCheck } = require("../middleware/Auth");

router.put("/cancel-request/:id", authCheck, cancelFromAgentRequest);
router.post("/auth", signinController);
router.patch("/password-update", authCheck, passwordUpdate);
router.patch("/email-update", authCheck, emailUpdate);

router.get("/getUserData", authCheck, getUsersData);
router.get("/getUserDataById/:userId", authCheck, getUserById);
router.get("/getAllUserDataById/:userId", authCheck, getUserDataById);

module.exports = router;
