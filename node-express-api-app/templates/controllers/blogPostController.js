module.exports = `const BlogPost = require('../models/BlogPost');


/*
@description 	Get all available blog posts.
*/
exports.fetchAllBlogPosts = (req, res) => {
	BlogPost.find()
			.sort({ created_at: -1 }) 
			.then(posts => res.json(posts))
			.catch(err => console.log(err));
};


/*
@description 	Create a new blog post.
*/
exports.createBlogPost = (req, res) => {
	const { 
		title,
		body,
	} = req.body;

	//quick validation
	if( !title || !body) {
		return res.status(400).json({ message: "The 'title' and 'body' are required." });
	}

	BlogPost.findOne({ title })
		.then(post => {
			if(post) {
				return res.status(400).json({ 
					message: "Blog post with the same title already exists and titles must be unique."
				});
			} else {
                //create a new blog post from the model
                const newBlogPost = new BlogPost({
                    title,
                    body
                });

                //add new user to the db
                newBlogPost.save()
                    .then(newPost => res.json(newPost));
			}
		});
};


/* 
@description 	Delete a single blog post with given id.
*/
exports.deleteOnePost = (req, res) => {
	const { id } = req.params;
	BlogPost.findById(id)
		.then(post => post.remove().then(() => res.json({success: true})))
		.catch(err => res.status(404).json({success: false}));
};


/* 
@description 	Update a single blog post with given id.
*/
exports.updateOnePost = (req, res) => {
	const { id } = req.params;
	BlogPost.findByIdAndUpdate(id, req.body, { new: true }, (err, data) => {
		if (err) {
			return res.status(404).json({success: false});
		}
		res.json(data);
	});
};
`;