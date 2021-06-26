require("colors");
const shell = require("shelljs");
const ora = require("ora");
const fse = require("fs-extra");
const configKeys = require("./templates/config/keys");
const controllersAuthController = require("./templates/controllers/authController");
const controllersBlogPostController = require("./templates/controllers/blogPostController");
const controllersUserController = require("./templates/controllers/userController");
const modelBlogPost = require('./templates/models/BlogPost');
const modelUser = require('./templates/models/User');
const middlewareAuth = require('./templates/middleware/auth');
const routeApiAuth = require('./templates/routes/api/auth');
const routeApiBlogposts = require('./templates/routes/api/blogposts');
const routeApiUsers = require('./templates/routes/api/users');
const envFile = require('./templates/env');
const gitignoreFile = require('./templates/gitignore');
const vercelConfig = require('./templates/vercel-config');
const indexJs = require('./templates/index');

const createDirectory = (appName, appDirectory) => {
    const spinner = ora(`Creating directory(${appName})...`).start();

    return new Promise((resolve, reject) => {
        // check if the directory already exists
        if (fse.existsSync(appDirectory)) {
            spinner.fail();
            console.log(`"${appName}" directory already exists.`.red);
            resolve();
            process.exit(0);
        } else {
            const newDir = shell.mkdir('-p', appDirectory);
            if (newDir) {
                spinner.succeed();
                console.log(`"${appName}" directory has been created successfully`.green);
                resolve();
            } else {
                spinner.fail();
                console.log(`Creation of "${appName}" directory failed`.red);
                resolve();
                process.exit(0);
            }
        }
    
    });
}

const changeDirectory = appName => {
    const spinner = ora("Changing directory...").start();

    return new Promise((resolve, reject) => {
        const cdRes = shell.cd(appName);

        if (cdRes.code != 0) {
            spinner.fail();
            console.log(`Error changing directory to ${appName}`.red);
            resolve()
            process.exit(0);
        }
        console.log(`\nDirectory changed.`.green);
        spinner.succeed();
        resolve();
    })
}

const initializeNPM = () => {
    const spinner = ora("Initializing NPM...").start();

    return new Promise((resolve, reject) => {
        if (shell.exec('npm init -y').code !== 0) {
            spinner.fail();
            console.log('Error: NPM initilization failed'.red);
            process.exit(0);
        }
        console.log(`\nNPM initlialized.`.green);
        spinner.succeed();
        resolve();
    })

}


const installPackages = async () => {
    const dependencies = [
        "express",
        "express-rate-limit",
        "bcryptjs",
        "cors",
        "dotenv",
        "jsonwebtoken",
        "mongoose"
    ];
    const devDependencies = ["nodemon"];

    await new Promise(resolve => {
        const spinner = ora("Installing Express and other additional dependencies...").start();

        shell.exec(`npm install --save ${dependencies.join(" ")}`, () => {
            console.log(`\nDependencies installed.`.green);
            spinner.succeed();
            resolve();
        });
    });

    await new Promise(resolve => {
        const spinner = ora("Installing additional development dependencies...").start();

        shell.exec(`npm install --save-dev ${devDependencies.join(" ")}`, () => {
            console.log(`\nDevelopment dependencies installed.`.green);
            spinner.succeed();
            resolve();
        })
    })
}

const updatePackageDotJson = () => {
    const spinner = ora("Updating package.json scripts...").start();

    return new Promise(resolve => {
        const rawPackage = fse.readFileSync("package.json");
        const package = JSON.parse(rawPackage);

        package.version = "0.1.0"
        package.scripts.start = "node index.js";
        package.scripts.server = "nodemon index.js";
        package.description = "A Node/Express API Application"

        fse.writeFile("package.json", JSON.stringify(package, null, 2), err => {
            if (err) {
                spinner.fail();
                return console.log(err);
            }
            console.log(`\npackage.json updated.`.green);
            spinner.succeed();
            resolve();
        })
    }) 
}

const addTemplates = async appName => {
    const spinner = ora("Adding templates...").start();

    await fse.outputFile("config/keys.js", configKeys);
    await fse.outputFile("controllers/authController.js", controllersAuthController);
    await fse.outputFile("controllers/blogPostController.js", controllersBlogPostController);
    await fse.outputFile("controllers/userController.js", controllersUserController);
    await fse.outputFile("models/BlogPost.js", modelBlogPost);
    await fse.outputFile("models/User.js", modelUser);
    await fse.outputFile("middleware/auth.js", middlewareAuth);
    await fse.outputFile("routes/api/auth.js", routeApiAuth);
    await fse.outputFile("routes/api/blogposts.js", routeApiBlogposts);
    await fse.outputFile("routes/api/users.js", routeApiUsers);
    await fse.outputFile(".env", envFile(appName));
    await fse.outputFile(".gitignore", gitignoreFile);
    await fse.outputFile("vercel.json", vercelConfig);
    await fse.outputFile("index.js", indexJs(appName));
    await fse.outputFile("info.txt", "Check out the bootstrap-express-api-app CLI README here: https://github.com/IamGideonIdoko/bootstrap-express-api-app#readme");

    console.log(`\nTemplates added.`.green);
    spinner.succeed();
}

exports.create = async (appName, appDirectory) => {
    try {
        await createDirectory(appName, appDirectory);
        await changeDirectory(appName);
        await initializeNPM(appName);
        await updatePackageDotJson();
        await installPackages();
        await addTemplates(appName);
    } catch (e) {
        console.log(`\nAn Error occured: ${e}`.red)
        return process.exit(0);
    }


    console.log(`\nSuccessfully bootstrapped your new Node/Express API App\n`.green);

    console.log("Spin up the development server".inverse);
    console.log(`> cd ${appName}`.blue.italic + `\n> npm run server`.blue.italic)
    console.log("Server will run on http://localhost:5000.".italic.dim)
    console.log(`\nHappy hacking!\n`.rainbow.bold);
    return true;
}