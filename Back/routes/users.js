const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mysql = require('mysql2')

const jwt = require('jsonwebtoken');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
})



router.get('/', (req, res) => {
    const sql = 'SELECT * FROM users'
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).json(results)
    })
})



router.post('/register', async (req, res) => {
    const { email, password, name, firstname, role } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const sql = 'INSERT INTO users (email, password, name, firstname, role) VALUES (?, ?, ?, ?, ?)'
    db.query(sql, [email, hashedPassword, name, firstname, role ], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(201).send({message: 'Utilisateur créé' });
    })
})




router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error('Erreur de requête à la base de données:', err);  // Journalisez l'erreur
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            console.log('Aucun utilisateur trouvé avec cet email:', email);  // Informations de débogage
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('Le mot de passe ne correspond pas pour l’utilisateur:', email);  // Informations de débogage
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }
        
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.status(200).json({ message: 'Utilisateur connecté', token: token });
    });
});


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // Si aucun jeton n'est fourni

    jwt.verify(token, '31HDeuzef3C3RCcrcRCTgfeEFZfrgrz', (err, user) => {
        if (err) return res.sendStatus(403); // Jeton invalide ou expiré
        req.user = user;
        next();
    });
}

router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'Profil de l\'utilisateur', user: req.user });
});





module.exports = router
