module.exports = `
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authController = require('../../controllers/authController');


/*
@route 			POST /api/auth
@description 	authenticate the user.
@access 		Public
*/
router.post('/', authController.authenticateUser);


/*
@route 			GET api/auth/user
@description 	Get authenticated user data.
@access 		Private
*/
router.get('/user', auth, authController.fetchAuthenticatedUser)


//export router
module.exports = router;
`;