const db = require("../dbConfig");

/**
 * GET Request to fetch all Investment details
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAllInvestments = async (req, res) => {
  try {
    const data = await db.query(`SELECT * FROM invested_sip`);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No investments found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Investments Data fetched successfully",
      totalInvestments: data[0].length,
      investments: data[0],
    });
  } catch (error) {
    console.log(`error fetching data from database, ${error}`);
    res.status(500).send({
      success: false,
      message: error,
    });
  }
};

/**
 * GET request using ID
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getInvestmentById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`id == ${id}`);
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "SIP ID is required !",
      });
    }
    const data = await db.query(`SELECT * FROM invested_sip WHERE sip_id = ?`, [
      id,
    ]);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Investment Data not found",
      });
    }
    res.status(200).send({
      success: true,
      message: data[0],
    });
  } catch (error) {
    console.log(`Error fetching investment by ID`);
    res.status(500).send({
      success: false,
      message: "Failed to find investment by ID",
    });
  }
};

/**
 * POST Request to Add new Investment
 * @param {*} req
 * @param {*} res
 * @returns
 */
const handleAddNewInvestment = async (req, res) => {
  try {
    const {
      sip_id,
      sip_name,
      amount_invested,
      frequency,
      platform,
      avg_interest,
    } = req.body;

    if (
      !sip_id ||
      !sip_name ||
      !amount_invested ||
      !frequency ||
      !platform ||
      !avg_interest
    ) {
      console.log(`All data are required to add new Investment !`);
      return res.status(400).send({
        success: false,
        message: "All Fields are required !",
      });
    }

    const data = await db.query(
      `INSERT INTO invested_sip (sip_id, sip_name, amount_invested, frequency, platform, avg_interest) VALUES (?, ?, ?, ?, ?, ?)`,
      [sip_id, sip_name, amount_invested, frequency, platform, avg_interest]
    );
    if (!data) {
      console.log(`Error adding Investment`);
      res.status(404).send({
        success: false,
        message: "Failed to Add Investment",
      });
    }
    res.status(201).send({
      success: true,
      message: "Investment added successfully",
    });
  } catch (error) {
    console.log(`Error adding new Investment, ${error}`);
    res.status(500).send({
      success: false,
      message: error,
    });
  }
};

/**
 * DELETE Request to Delete any Investment Row using sip_id
 * @param {*} req
 * @param {*} res
 * @returns
 */
const handleDeleteInvestmentById = async (req, res) => {
  try {
    const { sip_id } = req.body;
    if (!sip_id) {
      console.log(`SIP ID is required to delete the investment`);
      return res.status(400).send({
        success: false,
        message: "SIP ID is required to delete any investment",
      });
    }

    const data = await db.query(`DELETE FROM invested_sip WHERE sip_id = ?`, [
      sip_id,
    ]);
    if (!data) {
      res.status(404).send({
        success: false,
        message: "Investment not found or already deleted",
      });
    }
    res.status(200).send({
      success: true,
      message: "Investment deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Deleting Investment",
    });
  }
};

module.exports = {
  getAllInvestments,
  handleAddNewInvestment,
  handleDeleteInvestmentById,
  getInvestmentById,
};
