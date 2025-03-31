const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const requestRouter = require('./routes/request.route');

app.use('/request', requestRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});