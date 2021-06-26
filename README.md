# Bootstrap Express API App

*...quick bootstrapping tool.*

Bootstrap Express API App is a CLI tool that understands the need for speed and helps to quickly scaffold node.js/express API application boilerplate.

## Installation

**You'll need to have [Node.js](https://nodejs.org/en/download/) installed on you local development machine.**

Using [npm](http://npmjs.org) (the recommended way):

### Local Installation (Recommended)

With a local installation, `bootstrap-express-api-app` will not be available in your system path. Instead, the local installation can be run by using `npx bootstrap-express-api-app`.

```sh
# initiate setup
npx boostrap-express-api-app

# after setup is complete
cd [app-name]
npm run server
```

The server will run on port 5000. Go to [http://localhost:5000/](http://localhost:5000/) to see your app.<br>

> *Using the Local Installation will ensure that you are using the latest version of the tool.*



### Global Installation

Run the below in your terminal.

```bash
# install globally
npm install -g bootstrap-express-api-app
```

And Bootstrap Express API App will be installed globally to your system path. 

In your terminal still, run the following to kick-start the setup.

```bash
# initiate setup
bootstrap-express-api-app

# after setup is complete
cd [app-name]
npm run server
```

The server will run on port 5000. Go to [http://localhost:5000/](http://localhost:5000/) to see your app.<br>



## Boilerplate Structure

Bootstrap-Express-API-App will create a directory called `[app-name]` (or whatever you name your app) inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
[app-name]
├── node_modules
├── package.json
├── .gitignore
├── .env
├── vercel.json
├── info.txt
├── index.js
|
├── config
│   └── keys.js
|
├── controllers
│   ├── authController.js
│   ├── blogController.js
│   └── userController.js
|
├── middleware
│   └── auth.js
|
├── models
│   ├── BlogPost.js
│   └── User.js
|
└── routes
    └── api
	    ├── auth.js
	    ├── blogposts.js
	    └── users.js
```

No configuration or complicated folder structures, only the files you need to build your API app.<br>
Once the installation is done, you can open your project folder:

```sh
cd [app-name]
```

Inside the newly created project, you can run some built-in commands:

### `npm start` 

Runs the app in development mode but without the Nodemon's restart feature.<br>

### `npm run server` 

Runs the app in development mode with restart feature.<br>Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The server will automatically restart if you make changes to the code.<br>
You will see the errors & warnings in the console.



## What’s Included?

Your setup project will have almost everything you need to build a clean API application:

- Vercel config, so you can easily [deploy](https://dev.to/andrewbaisden/how-to-deploy-a-node-express-app-to-vercel-2aa) to your API app to [Vercel](https://vercel.com/).
- MVC file structure.
- MongoDB ORM integration ([Mongoose](https://mongoosejs.com/)).
- Authentication setup.
- A development server that warns about common mistakes ([Nodemon](https://nodemon.io)).



## Contributing

I'd love to have your helping hand on `bootstrap-express-api-app`! If you happen to find any bug while using this tool or you have a feature request, do well to [create an issue](https://github.com/IamGideonIdoko/bootstrap-express-api-app/issues).



## License

Bootstrap Express App is open source software [licensed as MIT](https://github.com/IamGideonIdoko/bootstrap-express-api-app/blob/master/LICENSE). 



## Author

[Gideon Idoko](https://github.com/IamGideonIdoko)