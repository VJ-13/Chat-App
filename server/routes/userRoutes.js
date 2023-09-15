// Importing required modules
const { register } = require('../controllers/userController');
const { login } = require('../controllers/userController');
const { setAvatar } = require('../controllers/userController');
const { getAllUsers } = require('../controllers/userController');

// Setting up router
const router = require('express').Router();

// Setting up routes
router.post("/register", register);
router.post('/login', login);
router.post('/setAvatar/:id', setAvatar);   
router.get('/allUsers/:id', getAllUsers);


module.exports = router;

