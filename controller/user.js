const express = require("express")
const app = express();
const router = express.Router()

const uuid = require("uuid")

const userRecords = require("../models/user")

const middlewWare = require("../middlewares/users-middleware")




// Handling users root path
router.all("/", (req, res) => {
    res.send("<h1>Welcome to users route</h1>")
})

let responseInfoData = {
    status: "",
    message: ""
}

// SIGN IN ROUTE
router.post("/sign-in/", middlewWare.signInValidation, (req, res) => {

    res.json(responseInfoData)
})

// SIGN UP ROUTE
router.post("/signup/", middlewWare.signUpValidation, (req, res) => {

    let submittedEmail = req.body.emailpassed;
    let submittedFullName = req.body.fullname;
    let submittedPassword = req.body.passwordpassed;

// Organizing the new user record in an object before pushing
    const newUserRecord = {
        id: uuid.v4(),
        email: submittedEmail,
        fullName: submittedFullName,
        password: submittedPassword
    };

// Pushing the new record to the database
    userRecords.push(newUserRecord)

    responseInfoData.status = "success";
    responseInfoData.message = "Congratulations! Your registration was successful.";
    responseInfoData.data = userRecords

    res.json(responseInfoData)
})

module.exports = router