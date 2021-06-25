module.exports = `
const express = require('express');
const config = require('../../config/keys');
const bcrypt = require('bcryptjs');
//get jsonwebtoken
const jwt = require('jsonwebtoken');

//get express router for handling routes access
const router = express.Router();

//get the User Model
const User = require('../../models/User');

/*
@route POST api/users
@description Register a new user.
@access Public
*/
router.post('/', (req, res) => {
	
	const { username, password } = req.body;

	//check if all input fields have value
	if(!username || !password) {
		return res.status(400).json({ message: 'Please, enter all fields.' });
	}

	//Check for existing user in that model through password
	User.findOne({ username })
		.then(user => {
			if(user) {
				return res.status(404).json({ message: 'User already exists.'})
			} else {
				//create new user from the model
				const newUser = new User({
					username,
					email
				});

				//hash password using bcrypt
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if(err) throw err;
						newUser.password = hash;
						
						//add new user to the db
						newUser.save()
							.then(user => {
								const { id, username, created_at } = user;
								jwt.sign(
									{ id }, //signs the user id as payload
									config.jwtSecret, //jwt secret
									{ expiresIn: 21600 }, //token to expire in 5 or 6hrs
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
					})
				})
			}
		})
})


//export router
module.exports = router;
`;