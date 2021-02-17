const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
res.json({title: 'Express', message: 'Hello world!'});
});

module.exports = router;
