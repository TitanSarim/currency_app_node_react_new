const { pool } = require('../config/database');



const createCurrency = async(req, res) => {

    try {

        const {name, cnic, currency, amount, totalamount} = req.body

        const query = `
            INSERT INTO category (name, cnic, currency, amount, totalamount)
            VALUES (?, ?, ?, ?, ?)
        `;

        pool.query(query, [name, cnic, currency, amount, totalamount], (err, results) => {
            if (err) {
                console.error("Error creating currency:", err);
                res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    error: err.message
                });
                return;
            }

            res.status(201).json({
                success: true,
                message: "Entry added successfully",
                data: results.insertId
            });
        });
        

    } catch (error) {
        console.error("Error creating currency:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message 
        }); 
    }

}


// Retrieve all currency entries
const allCurrency = async (req, res) => {
    try {
        const query = `SELECT * FROM category`;

        pool.query(query, (err, results) => {
            if (err) {
                console.error("Error retrieving currencies:", err);
                res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    error: err.message
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: "Entries retrieved successfully",
                data: results
            });
        });

    } catch (error) {
        console.error("Error retrieving currencies:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Delete a currency entry by ID
const deleteCurrencies = async (req, res) => {
    try {
        const id = req.params.id;

        const query = `DELETE FROM category WHERE id = ?`;

        pool.query(query, [id], (err, results) => {
            if (err) {
                console.error("Error deleting currency:", err);
                res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    error: err.message
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: "Entry deleted successfully",
                data: results.affectedRows
            });
        });

    } catch (error) {
        console.error("Error deleting currency:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};


module.exports = {
    createCurrency,
    allCurrency,
    deleteCurrencies
}