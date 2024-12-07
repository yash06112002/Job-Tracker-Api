const express = require('express');
const { protect } = require('../middlewares/auth');
const {
    getApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication,
} = require('../controllers/application');

const router = express.Router();

// Routes
router.route('/')
    .get(protect, getApplications) // Get all applications for a user
    .post(protect, createApplication); // Add a new application

router.route('/:id')
    .get(protect, getApplicationById) // Get a specific application
    .put(protect, updateApplication) // Update an application
    .delete(protect, deleteApplication); // Delete an application

module.exports = router;
