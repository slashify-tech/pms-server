const { cancelFromAgentRequest } = require("../controllers/PoliciesController");
const { signinController, getUsersData, getUserById, getUserDataById} = require("../controllers/UserController");
const { authCheck } = require("../middleware/Auth");

module.exports = (app)=>{
    app.post("/api/v1/auth", signinController);
    app.put("/api/v1/cancel-request/:id", cancelFromAgentRequest)

    app.get("/api/v1/getUserData", authCheck, getUsersData)
    app.get("/api/v1/getUserDataById/:userId", getUserById)
    app.get("/api/v1/getAllUserDataById/:userId", getUserDataById)

}