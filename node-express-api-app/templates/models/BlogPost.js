module.exports = `const mongoose = require('mongoose');
const { Schema } = mongoose;


// Define BlogPost schema.
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

// Create BlogPost model.
const BlogPost = mongoose.model('blogpost', BlogPostSchema);


module.exports = BlogPost;
`;