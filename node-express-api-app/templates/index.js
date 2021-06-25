module.exports = appName =>`require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require("express-rate-limit");
// routes
const usersRoute = require('./routes/api/users');
const blogpostsRoute = require('./routes/api/blogposts');
const authRoute = require('./routes/api/auth');

// mongoDB connection string.
const db = require('./config/keys').mongodbURI;

// initialise express
const app = express();

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/* 
@description    For CORS (To allow for every request set \`corsOption.origin\` to true)
*/
const allowlist = ['http://localhost:5000']
const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // enable CORS for this request.
    } else {
        corsOptions = { origin: false } // disable CORS for this request.
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}
app.options('*', cors()); // enable preflight request for DELETE request
app.use(cors(corsOptionsDelegate));


const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute window
	max: 100, // limit each IP to 100 requests per windowMs (100request per minute)
	message: 'You have exceeded the 100 requests in 1 min limit!', 
	headers: true,
});
// limited on all requests
app.use(limiter);


/* 
@description    MongoDB Connection using Mongoose ORM
*/
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log("MONGODB CONNECTION ERROR: " + err ));


/* 
@description    Use route.
*/
app.use('/api/users', usersRoute);
app.use('/api/blogposts', blogpostsRoute);
app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
    res.json({
        app_name: "${appName}",
        description: "This app was bootstrapped by 'Bootstrap-Express-API-App' CLI tool."
    });
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server started on port ' + port);
});
`;