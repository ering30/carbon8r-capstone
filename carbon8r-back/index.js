const express = require('express')
let cors = require("cors");
const app = express()

app.use(express.json());
app.use(cors()); 

// ----------  database configuration
const mysql = require('mysql2'); 
const dbConfig = require('./config/db.config.js');

var connection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});
module.exports = connection;

// ports

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Carbon8r app listening at http://localhost:${port}`)
})

// ---------- routes
let journeyRoutes = require ('./routes/JourneyRoutes')
let userRoutes = require ('./routes/UserRoutes')

app.use('/journeys', journeyRoutes)
app.use('/users', userRoutes)


// ---------- swagger api 
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
