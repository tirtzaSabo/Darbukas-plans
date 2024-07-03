require('dotenv').config()
const userRoutes = require('./routers/user.router');
const serviceRoutes = require('./routers/service.router');
const express = require('express');
const app = express();

const port = process.env.PORT || 4000;
app.use('/users',userRoutes );
app.use('/services', serviceRoutes);
app.use('/businesses', businessRoutes);
app.use('/events', eventRoutes);


app.get("*", (req, res) => {
    res.status(404);
    res.send("PAGE NOT FOUND");
});

app.listen(port, () => {
    console.log(`we listening at http://localhost:${port}`);
})