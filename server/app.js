require('dotenv').config()
const express = require('express');
const app = express();

const port = process.env.PORT || 4000;

app.get("*", (req, res) => {
    res.status(404);
    res.send("PAGE NOT FOUND");
});

app.listen(port, () => {
    console.log(`we listening at http://localhost:${port}`);
})