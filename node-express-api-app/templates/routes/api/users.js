module.exports = `const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

/*
@route          POST api/users
@description    Register a new user.
@access         Public
*/
router.post('/', userController.registerNewUser);


module.exports = router;
`;