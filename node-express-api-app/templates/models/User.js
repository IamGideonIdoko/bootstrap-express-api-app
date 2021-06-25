module.exports = `const mongoose = require('mongoose');
const { Schema } = mongoose;

//define a new schema for User model
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

//create User model
const User = mongoose.model('User', UserSchema);

//export the model
module.exports = User;
`;