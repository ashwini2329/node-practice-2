const express = require("express");

const router = express.Router();

const {
    getAllInvestments,
    handleAddNewInvestment,
    handleDeleteInvestmentById,
} = require("../controllers/investment");

router.get("/", getAllInvestments);

router.post("/addInvestment", handleAddNewInvestment);

router.delete("/deleteInvestment", handleDeleteInvestmentById);

module.exports = router;