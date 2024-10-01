const express = require("express");

const router = express.Router();

const {
  getAllInvestments,
  handleAddNewInvestment,
  handleDeleteInvestmentById,
  getInvestmentById,
} = require("../controllers/investment");

router.get("/", getAllInvestments);

router.get("/:id", getInvestmentById);

router.post("/addInvestment", handleAddNewInvestment);

router.delete("/deleteInvestment", handleDeleteInvestmentById);

module.exports = router;
