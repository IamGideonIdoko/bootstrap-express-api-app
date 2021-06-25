module.exports = `const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const blogPostController = require('../../controllers/blogPostController');

/*
@route 			GET api/blogposts
@description 	Get all available blog posts.
@access 		Public.
*/
router.get('/', blogPostController.fetchAllBlogPosts);


/*
@route 			POST api/blogposts
@description 	Create a new blog post.
@access 		Private (auth needed).
*/
router.post('/', auth, blogPostController.createBlogPost);


/*
@route 			DELETE api/blogposts/:id
@description 	Delete a single blog post with given id.
@access 		Private (auth needed).
*/
router.delete('/:id', auth, blogPostController.deleteOnePost);


/*
@route 			PUT api/blogposts/:id
@description 	update a single blog post with given id.
@access 		Private (auth needed).
*/
router.put('/:id', auth, blogPostController.updateOnePost);


module.exports = router;
`