const router = require('express').Router();

module.exports = router.post('/', (req, res) => {
  res.json({
    message: "hello there",
  });
});