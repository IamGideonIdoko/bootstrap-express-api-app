module.exports = `require('dotenv').config();

module.exports = {
	mongodbURI: process.env.MONGODB_URI,
	jwtSecret: process.env.JWT_SECRET
}
`