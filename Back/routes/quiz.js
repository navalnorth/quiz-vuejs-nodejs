const mysql = require('mysql2')
const express = require('express')
const router = express.Router()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
})



router.post('/creationQuiz', async (req, res) => {
    const { nom_quiz } = req.body

    const sql = 'INSERT INTO quiz (nom_quiz) VALUES (?)'
    db.query(sql, [ nom_quiz ], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(201).send({ quizid : result.insertId });
    })
})



router.get('/listQuiz', async (req, res) => {
    const sql = 'SELECT * from quiz'
    const { nom_quiz } = req.body

    db.query(sql, [ nom_quiz ], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(201).send({ quiz : result });
    })
})


router.delete('/delete/:id_quiz', async (req, res) => {
    const sql = 'DELETE FROM quiz WHERE id_quiz = ?'
    const { id_quiz } = req.params

    db.query(sql, [ id_quiz ], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(201).send({ quizid : result.insertId });
    })
})



router.post('/:id_quiz/creationQuestion', async (req, res) => {
    const { nom_question, reponses, reponse_correcte } = req.body
    const { id_quiz } = req.params

    const sql2 = 'INSERT INTO question (id_quiz, nom_question, reponses, reponse_correcte ) VALUES (?, ?, ?, ?)'
    db.query(sql2, [ id_quiz, nom_question, JSON.stringify(reponses), reponse_correcte ], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(201).send({message: 'Question crée' });
    })
})








module.exports = router