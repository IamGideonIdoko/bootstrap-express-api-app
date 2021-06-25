module.exports = `const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Blog Post Schema
const BlogPostSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	body: {
		type: String,
		required: true
	},
    created_at: {
        type: Date,
        default: Date.now
    }
});

//create BlogPost model
const BlogPost = mongoose.model('blogpost', BlogPostSchema);

//export the model
module.exports = BlogPost;
`;