// Importing required modules
const { addMessage } = require('../controllers/messagesController');
const { getAllMessages } = require('../controllers/messagesController');

// Setting up router
const router = require('express').Router();

// Setting up routes
router.post("/addMessages/", addMessage);
router.post("/getAllMessages/", getAllMessages);


module.exports = router;

