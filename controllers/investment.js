const db = require("../dbConfig");

const getAllInvestments = async(req, res) => {
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

module.exports = { getAllInvestments };