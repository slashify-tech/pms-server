const express = require('express');
const router = express.Router();
const { getMbOptions, getMgOptions } = require("../controllers/PoliciesController");
const { authCheck } = require('../middleware/Auth');


router.get("/mgOptions", authCheck, getMgOptions);
router.get("/mbOptions", authCheck, getMbOptions);

module.exports = router;