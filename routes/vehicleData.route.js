const { getMbOptions, getMgOptions } = require("../controllers/PoliciesController");

module.exports = (app) => {
  app.get("/api/v1/mgOptions", getMgOptions);
  app.get("/api/v1/mbOptions", getMbOptions);
};
