const express = require("express");
const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
    res.status(200).send("<h1>Hello from Node.Js App 2</h1>");
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});