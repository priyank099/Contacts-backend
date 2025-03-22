const express = require('express');
const errorHandler = require('./Middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config()
const app = express();

connectDB();
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

app.use(express.json());
app.use("/api/contacts", require("./Routes/contactRoutes"));
app.use("/api/users", require("./Routes/userRoutes"));
app.use(errorHandler);