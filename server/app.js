require('dotenv').config()
const { swaggerUi, specs } = require('./swaggerConfig');
const cors = require('cors');
const verifyToken = require('./middlewears/auth.middlewear')
// const { swaggerUi, swaggerSpec } = require('./swaggerConfig');
const userRoutes = require('./routes/user.router');
const serviceRoutes = require('./routes/service.router');
const businessRoutes = require('./routes/business.router');
const eventRoutes = require('./routes/event.router');
const express = require('express');

const app = express();
app.use(express.json());
const corsOptions = {
    origin: 'http://127.0.0.1:5173',
    credentials: true,
};
app.use(cors(corsOptions));
const port = process.env.PORT || 4000;
 app.use('/api', swaggerUi.serve, swaggerUi.setup(specs));
// app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/users', userRoutes);
app.use(verifyToken);
app.use('/services', serviceRoutes);
app.use('/business', businessRoutes);
app.use('/events', eventRoutes);


app.get("*", (req, res) => {
    res.status(404);
    res.send("PAGE NOT FOUND");
});

app.listen(port, '127.0.0.1',() => {
    console.log(`we listening at http://127.0.0.1:${port}`);
})