const userRecords = require("../models/user")

// Checking for email occurence
exports.emailExists = (emailSubmitted) => {

    let matchedEmail = userRecords.find((user) => {
        return (emailSubmitted === user.email )
    });

    return !((matchedEmail === undefined) || (matchedEmail.length === 0));
};


// Compare two passwords
exports.signupPasswordMatched = (password, confirmPassword) => {

    return (password === confirmPassword);
};
