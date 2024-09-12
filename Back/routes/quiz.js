const mysql = require("mysql2");
const express = require("express");
const router = express.Router();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

router.post("/creationQuiz", (req, res) => {
  const { nom_quiz, questions } = req.body;

  const sqlQuiz = "INSERT INTO quiz (nom_quiz) VALUES (?)";
  db.query(sqlQuiz, [nom_quiz], (err, result) => {
    if (err)
      return res
        .status(500)
        .send({ message: "Erreur lors de la création du quiz." });

    const idQuiz = result.insertId;

    const sqlQuestions =
      "INSERT INTO question (id_quiz, nom_question, reponses, reponse_correcte) VALUES ?";

    const questionData = questions.map((q) => [
      idQuiz,
      q.nom_question,
      JSON.stringify(q.reponses),
      q.reponse_correcte,
    ]);

    db.query(sqlQuestions, [questionData], (err) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Erreur lors de l'insertion des questions." });
      res.status(201).send({ message: "Quiz et questions créés avec succès." });
    });
  });
});

router.get("/listQuiz", async (req, res) => {
  const sql = "SELECT * from quiz";
  const { nom_quiz } = req.body;

  db.query(sql, [nom_quiz], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ quiz: result });
  });
});

router.delete("/delete/:id_quiz", async (req, res) => {
  const sql = "DELETE FROM quiz WHERE id_quiz = ?";
  const { id_quiz } = req.params;

  db.query(sql, [id_quiz], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ quizid: result.insertId });
  })
})



router.put('/updateQuiz/:id_quiz', (req, res) => {
    const { id_quiz } = req.params;
    const { nom_quiz, questions } = req.body;

    const quizSql = 'UPDATE quiz SET nom_quiz = ? WHERE id_quiz = ?';
    db.query(quizSql, [nom_quiz, id_quiz], (err, results) => {
        if (err) { return res.status(500).send(err) }

        const deleteSql = 'DELETE FROM question WHERE id_quiz = ?';
        db.query(deleteSql, [id_quiz], (err, results) => {
            if (err) { return res.status(500).send(err) }

            const questionSql = 'INSERT INTO question (id_quiz, nom_question, reponses, reponse_correcte) VALUES ?';
            const questionData = questions.map((q) => [
                id_quiz,
                q.nom_question,
                JSON.stringify(q.reponses),
                q.reponse_correcte,
            ])
            db.query(questionSql, [questionData], (err) => {
                if (err) { return res.status(500).send(err) }
                res.status(201).send({ message: 'Quiz modifié' });
            });
        });
    });
});
  
  
router.get('/updateQuiz/:id_quiz', async (req, res) => {
    const { id_quiz } = req.params;

    const sqlQuiz = 'SELECT * FROM quiz WHERE id_quiz = ?';
    db.query(sqlQuiz, [id_quiz], (err, quizResults) => {
        if (err) { return res.status(500).send(err) }

        const quiz = quizResults[0];

        const sqlQuestions = 'SELECT * FROM question WHERE id_quiz = ?';
        db.query(sqlQuestions, [id_quiz], (err, questionResults) => {
            if (err) { return res.status(500).send(err) }

            quiz.questions = questionResults.map(q => ({
                nom_question: q.nom_question,
                reponses: JSON.parse(q.reponses),
                reponse_correcte: q.reponse_correcte
            }));

            res.status(200).json(quiz);
        });
    });
});


module.exports = router;












