const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./config/db');
const requestRouter = require('./routes/request.route');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/request', requestRouter);

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
