const express = require('express');
const router = express.Router();
const db = require('./../../database');

const jwt = require('jsonwebtoken');

router.post('', (req, res) => {
  const { username, password } = req.body;
  db.query(`SELECT * FROM users`, (err, rows) => {
    if (!err) {
      const user = rows.find(row => row.lastName === username && row.password === password);
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        userId: user.id,
        username: `${ user.firstName } ${ user.lastName }`
      }, process.env.JWT_KEY);
      return res.json({
        token,
        user,
      });
    }
  });
});

module.exports = router;