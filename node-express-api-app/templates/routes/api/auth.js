module.exports = `
const express = require('express');
const config = require('../../config/keys');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

//get auth middleware
const auth = require('../../middleware/auth');

//get express router for handling routes access
const router = express.Router();

//get the User Model
const User = require('../../models/User');


/*
@route POST  /api/auth
@description authenticate the user.
@access Public
*/
router.post('/', (req, res) => {
	const { username, password } = req.body;

	//check if all input fields have value
	if(!username || !password) {
		return res.status(400).json({ message: 'Please, enter all fields.' });
	}

	//Check for existing user in that model through username
	User.findOne({ username })
		.then(user => {
			if(!user) {
				return res.status(404).json({ message: 'User does not exist.'})
			} else {
				//validate password
				bcrypt.compare(password, user.password)
					.then(isMatch => {
						if(!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });
						const { id, username, created_at } = user;

						jwt.sign(
							{ id }, //signs the user id as payload
							config.jwtSecret, //jwt secret
							{ expiresIn: 21600 }, //token to expire in 5 or 6 hrs
							(err, token) => { //callback
								if (err) throw err;
								res.json({
									token,
									user: {
										id,
										username,
										created_at
									}
								})
							}
						)
					});
			}
		});
});


/*
@route GET api/auth/user
@description Get authenticated user data.
@access Private
*/
router.get('/user', auth, (req, res) => {
	User.findById(req.user.id) //user id is gotten from the authenticated token
	.select('-password') //removes the password from the selection
	.then(user => res.json(user));
})


//export router
module.exports = router;
`;