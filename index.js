const express = require("express")
const app = express()
app.use(express.json())

const env = require("dotenv")
const HOSTNAME = "127.0.0.1"

env.config()
const usersRoute = require("./controller/user")
const productRoute = require("./controller/product")


app.use("/users/", usersRoute)

app.use("/products/", productRoute)


app.get("*", (req, res) => {
    const errorNotFound = {
        statusCode: "404",
        statusMessage: "Page not found"
    }
    res.send(errorNotFound)
})


app.listen(process.env.PORT, HOSTNAME, () => {
    console.log(`Server is running at HOST: ${HOSTNAME} on port: ${process.env.PORT}`)
})