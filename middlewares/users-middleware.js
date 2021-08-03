const userRecords = require("../models/user")

const authController = require("../controller/auth-helper")


let responseInfoData = {
    status: "",
    message: ""
}


// SIGN IN ROUTE HANDLER MIDDLEWARE
exports.signInValidation = (req, res, next) => {

    let submittedEmail = req.body.emailpassed
    let submittedPassword = req.body.passwordpassed

    let correctDetails = userRecords.find((user) => {
        return ((submittedEmail === user.email ) && (submittedPassword === user.password ))
    })

    if ((correctDetails === undefined) || (correctDetails.length === 0)) {
        responseInfoData.status = "error"
        responseInfoData.message = "Sorry! Your username or password is incorrect. Please try again."
        delete responseInfoData.data // Deleting the data array of object if details are wrong
    }
    else {
        responseInfoData.status = "success";
        responseInfoData.message = "You have successfully signed in.";
    }
    res.json(responseInfoData)
    next()
}



// SIGN UP ROUTE HANDLER MIDDLEWARE
exports.signUpValidation = (req, res, next) => {

    let submittedEmail = req.body.emailpassed
    let submittedPassword = req.body.passwordpassed
    const submittedConfirmPassword = req.body.confirmpassword;

    if (authController.emailExists(submittedEmail)) {
        responseInfoData.status = "error"
        responseInfoData.message = "Sorry! A user with this email address already exist."
        delete responseInfoData.data

        res.json(responseInfoData)

    }

    if (!authController.signupPasswordMatched(submittedPassword, submittedConfirmPassword)) {
        responseInfoData.status = "error"
        responseInfoData.message = "Sorry! Your passwords do not match. Please try again."
        delete responseInfoData.data

        res.json(responseInfoData)
    }

    next()
}








