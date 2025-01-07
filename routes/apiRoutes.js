const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Routes for managing APIs
router.post('/add', apiController.addApi);
router.delete('/delete/:id', apiController.deleteApi);
router.put('/limit/:id', apiController.updateLimit);
router.get('/stats/:id', apiController.getStats);
router.get('/all', apiController.getAllApis); // New endpoint for getting all APIs

module.exports = router;
