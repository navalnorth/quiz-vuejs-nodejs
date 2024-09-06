require('dotenv').config();
const express = require('express');
const cors = require('cors')
const mysql = require('mysql2')
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
app.use(cors({origin: "http://localhost:8080"}));

app.use(bodyParser.json())


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    token: process.env.ACCES_TOKEN_SECRET
})

db.connect((err) => {
    if (err) {
        console.log('ERREUR');
    } else {
        console.log('BRAVO');
        
    }
})

const userRoutes = require('./routes/users.js')
const quizRoutes = require('./routes/quiz.js')

app.use('/api/users', userRoutes)
app.use('/api/quiz', quizRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('SERVER DEMARRE');
})