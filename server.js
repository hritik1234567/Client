const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan'); // Import morgan middleware
const connectdb = require('./config/db');
const auth=require('./routes/auth')
const cors=require('cors');
const categoryRoutes=require('./routes/categoryRoute')
const productRoutes=require('./routes/productRoutes')
dotenv.config();
connectdb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Use morgan middleware for logging



//Routes
app.use("/api/v1/auth",auth);

app.use("/api/v1/auth",auth);

app.use("/api/v1/category",categoryRoutes);

//Product Routes
app.use("/api/v1/product",productRoutes);
//
app.get('/', (req, res) => {
    res.send("<h1>Welcome to E-commerce App</h1>");
});

const PORT = process.env.PORT || 8000; // Provide a default port if PORT is not specified in the environment
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`.bgBlue);
});
