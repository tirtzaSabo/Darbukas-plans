require('dotenv').config()
const { swaggerUi, specs } = require('./swaggerConfig'); 
const cors = require('cors');
// const { swaggerUi, swaggerSpec } = require('./swaggerConfig');
const userRoutes = require('./routes/user.router');
const serviceRoutes = require('./routes/service.router');
const businessRoutes = require('./routes/business.router');
const eventRoutes = require('./routes/event.router');
const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;
app.use(cors());
app.use('/api', swaggerUi.serve, swaggerUi.setup(specs));
// app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/users',userRoutes );
app.use('/services', serviceRoutes);
app.use('/business',businessRoutes);
app.use('/events', eventRoutes);


app.get("*", (req, res) => {
    res.status(404);
    res.send("PAGE NOT FOUND");
});

app.listen(port, () => {
    console.log(`we listening at http://localhost:${port}`);
})