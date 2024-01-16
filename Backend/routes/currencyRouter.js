const express = require('express')
const {createCurrency, allCurrency, deleteCurrencies} = require('../controllers/currencyController')

const router = express.Router();



router.route("/createCurrey").post(createCurrency);

router.route('/getAllCurrencies').get(allCurrency)

router.route('/deleteCurrencies/:id').delete(deleteCurrencies)

module.exports = router