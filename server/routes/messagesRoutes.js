const { addMessage } = require('../controllers/messagesController');
const { getAllMessages } = require('../controllers/messagesController');
const router = require('express').Router();

router.post("/addMessages/", addMessage);
router.post("/getAllMessages/", getAllMessages);


module.exports = router;

