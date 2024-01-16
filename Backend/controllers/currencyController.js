const Currency = require("../models/currencyModels")



const createCurrency = async(req, res) => {

    try {

        const {name, cnic, currency, amount, totalamount} = req.body

        const data = await Currency.create(req.body)

        res.status(201).json({
            success: true,
            message: "Entry added successfully",
            data: data
        })

    } catch (error) {
        console.error("Error creating currency:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message // Send the error message to the client for debugging purposes
        }); 
    }

}


const allCurrency = async(req, res) => {

    try {

        const data = await Currency.find()
        console.log("data", data)
        res.status(201).json({
            success: true,
            message: "Entries retrived successfully",
            data: data
        })

    } catch (error) {
        return error        
    }

}


const deleteCurrencies = async(req, res) => {

    try {

        const id = req.params.id

        console.log("id", id)

        const data = await Currency.findByIdAndDelete(id)

        res.status(203).json({
            success: true,
            message: "Entries deleted successfully",
            data: data
        })

    } catch (error) {
        console.error("Error creating currency:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message 
        });       
    }

}


module.exports = {
    createCurrency,
    allCurrency,
    deleteCurrencies
}