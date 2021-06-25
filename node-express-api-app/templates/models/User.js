module.exports = `const mongoose = require('mongoose');
const { Schema } = mongoose;


// Define User schema.
const UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
    created_at: {
        type: Date,
        default: Date.now
    }
})

// Create User model.
const User = mongoose.model('User', UserSchema);


module.exports = User;
`;