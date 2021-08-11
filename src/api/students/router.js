const express = require('express');
const router = express.Router();

const cacheService = require('../students/handler');

router.post('/set', cacheService.setCache);
router.get('/get', cacheService.getCache);
router.delete('/delete', cacheService.removeCache);

module.exports = router;
