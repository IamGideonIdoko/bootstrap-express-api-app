module.exports = `
const express = require('express');

//get express router
const router = express.Router();

//get the BlogPost model
const BlogPost = require('../../models/BlogPost');

//get the AdminUser model
const Adminuser = require('../../models/AdminUser');

//get the auth middleware
const auth = require('../../middleware/auth');

//get config
const config = require('../../config/keys');


/*
@route 			GET api/blogposts
@description 	Get all available blog posts
@access 		Public
*/
router.get('/', (req, res) => {
	BlogPost.find()
			.sort({ created_at: -1 }) 
			.then(posts => res.json(posts))
			.catch(err => console.log(err));
});


/*
@route 			POST api/blogposts
@description 	Create a new blog post
@access 		Private (auth needed)
*/
router.post('/', auth, (req, res) => {

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

});


/*
@route 			DELETE api/blogposts/:id
@description 	Delete a single blog post with given id
@access 		Private (auth needed)
*/
router.delete('/:id', auth, (req, res) => {
	const { id } = req.params;
	BlogPost.findById(id)
		.then(post => post.remove().then(() => res.json({success: true})))
		.catch(err => res.status(404).json({success: false}));
});


/*
@route 			PUT api/blogposts/:id
@description 	update a single blog post with given id
@access 		Private (auth needed)
*/
router.put('/:id', auth, (req, res) => {
	const { id } = req.params;
	BlogPost.findByIdAndUpdate(id, req.body, { new: true }, (err, data) => {
		if (err) {
			return res.status(404).json({success: false});
		}
		res.json(data);
	});
});


module.exports = router;
`