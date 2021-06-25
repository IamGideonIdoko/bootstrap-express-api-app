module.exports = `const User = require('../models/User');
const config = require('../config/keys');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


/*
@description 	authenticate the user.
*/
exports.authenticateUser = (req, res) => {
	const { username, password } = req.body;

	// validate
	if(!username || !password) {
		return res.status(400).json({ message: 'Please, enter all fields.' });
	}

	// check for existing user with username
	User.findOne({ username })
		.then(user => {
			if(!user) {
				return res.status(404).json({ message: 'User does not exist.'})
			} else {
				// validate password
				bcrypt.compare(password, user.password)
					.then(isMatch => {
						if(!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });
						const { id, username, created_at } = user;

						jwt.sign(
							{ id }, // signs the user id as payload
							config.jwtSecret, // jwt secret
							{ expiresIn: 21600 }, // token to expire in 5 or 6 hrs
							(err, token) => { // callback
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
};


/*
@description 	Get authenticated user data.
*/
exports.fetchAuthenticatedUser = (req, res) => {
	User.findById(req.user.id) // user id is gotten from the auth decoded token
	    .select('-password') // removes the password from the selection
	    .then(user => res.json(user));
};
`;