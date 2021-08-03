const express = require("express")
const uuid = require("uuid")
const router = express.Router()
const productArray = require("../models/products")


let responseInfoData = {};


// HANDLING NEW PRODUCT ROUTE
router.post("/new-product", (req, res) => {

    let {productname, productdescription, productimage, productprice} = req.body;

    // Converting the price to number
    productprice = parseInt(productprice);

    // Generating a unique id with Unix time for every new product coming.
    let productUniqueId = uuid.v4();

    let newProductObject = {
        id: productUniqueId,
        name: productname,
        description: productdescription,
        image: productimage,
        price: productprice
    }

    // Saving to our database
    productArray.push(newProductObject)

    // Returning the array with the newly added item
    res.json(productArray).statusCode(200)
})


// READ OPERATION - List all products
router.get("/view-products", (req, res) => {

    res.json(res.send(productArray)).statusCode(200);
})


// UPDATE OPERATION
router.put("/update-product/:id", (req, res) => {

    let productid = req.params.id;
    let {productname, productdescription, productimage, productprice} = req.body
    productid = parseInt(productid)
    productprice = parseInt(productprice)

    // Getting the index of where the passed Item Id is in the array of object (data source).
    let queryIndex = productArray.findIndex(productItem => productItem.id === productid)
    queryIndex = parseInt(queryIndex)

    if (!(queryIndex === -1)) {
        productArray[queryIndex].name = productname
        productArray[queryIndex].description = productdescription
        productArray[queryIndex].image = productimage
        productArray[queryIndex].price = productprice
    } else {
        responseInfoData.status = "error"
        responseInfoData.message = "Sorry! This product does not exist in our database."

        res.send(responseInfoData).statusCode(200)
    }
    res.json(res.send(productArray)).statusCode(200)
})


// DELETE OPERATION
router.delete("/delete-product/:id/", (req, res) => {

    let itemId = parseInt(req.params.id);
    let queryIndex = 0;
    queryIndex = productArray.findIndex(productItem => productItem.id === itemId)
    queryIndex = parseInt(queryIndex)


    if ( !(queryIndex === -1) ) {
        // Deleting the object from the array
        productArray.splice(queryIndex, 1)
    } else {

        responseInfoData.status = "error"
        responseInfoData.message = "Sorry! This product does not exist in our database."
        res.send(responseInfoData)
    }

// Returning the array after deleting the item that matches the query
    res.json(res.send(productArray)).statusCode(200)
})


module.exports = router;