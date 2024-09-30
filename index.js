const express = require("express");
const app = express();
const PORT = 8080;

const db = require("./dbConfig");

const investmentRoutes = require("./routes/investment");

app.get("/", (req, res) => {
    res.status(200).send("<h1>Hello from Node.Js App 2</h1>");
});

app.use("/users/investment", investmentRoutes);

db.query("Select 1")
    .then(() => {
        console.log(`Connected to Database !`);
        app.listen(PORT, () => {
            console.log(`Server started at ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(`Error connecting to database !`);
    });