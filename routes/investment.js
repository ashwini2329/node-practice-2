const express = require("express");

const router = express.Router();

const { getAllInvestments } = require("../controllers/investment");

router.get("/", getAllInvestments);

module.exports = router;