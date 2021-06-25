require("colors");
const shell = require("shelljs");
const ora = require("ora");
const fse = require("fs-extra");
const configKeys = require("./templates/config/keys");
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

const templates = [
    { path: "config/keys.js", file: configKeys },
    { path: "models/BlogPosts.js", file: modelBlogPost },
    { path: "models/User.js", file: modelUser },
    { path: "middleware/auth.js", file: middlewareAuth },
    { path: "routes/api/auth.js", file: routeApiAuth },
    { path: "routes/api/blogposts.js", file: routeApiBlogposts },
    { path: "routes/api/users.js", file: routeApiUsers },
    { path: ".env", file: envFile },
    { path: ".gitignore", file: gitignoreFile },
    { path: "vercel.json", file: vercelConfig },
    { path: "index.js", file: indexJs },
];

const createDirectory = (appName, appDirectory) => {
    const spinner = ora(`Creating directory(${appName})...`).start();

    return new Promise((resolve, reject) => {
        // check if the directory already exists
        if (fse.existsSync(appDirectory)) {
            spinner.fail();
            console.log(`"${appName}" directory already exists.`.red);
            resolve();
            // process.exit(0);
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

        spinner.succeed();
        resolve();
    })

}


const installPackages = async () => {
    const dependencies = [
        "express",
        "express-validator",
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
            spinner.succeed();
            resolve();
        });
    });

    await new Promise(resolve => {
        const spinner = ora("Installing additional development dependencies...").start();

        shell.exec(`npm install --save-dev ${devDependencies.join(" ")}`, () => {
            spinner.succeed();
            resolve();
        })
    })
}

const updatePackageDotJson = () => {
    const spinner = ora("Updating package.json scripts...");

    return new Promise(resolve => {
        const rawPackage = fse.readFileSync("package.json");
        const package = JSON.parse(rawPackage);

        package.scripts.start = "node index.js";
        package.scripts.server = "nodemon index.js";
        package.description = "A Node/Express API Application"

        fse.writeFile("package.json", JSON.stringify(package, null, 2), err => {
            if (err) {
                spinner.fail();
                return console.log(err);
            }

            spinner.succeed();
            resolve();
        })
    }) 
}

const addTemplates = async templateList => {
    const spinner = ora("Adding templates...").start();

    

    await new Promise(resolve => {
        try {
            templateList.forEach(async template => {
                // outputFiles createa a directory owhen it doesn't exist
                await fse.outputFile(template.path, template.file);
            });
        } catch (e) {
            console.log(`\nAn Error occured: ${e}`.red)
            process.exit(0);
        }
        spinner.succeed();
        resolve();
    })
}

exports.create = async (appName, appDirectory) => {
    try {
        await createDirectory(appName, appDirectory);
        await changeDirectory(appName);
        await initializeNPM(appName);
        await updatePackageDotJson();
        // await installPackages();
        await addTemplates(templates);
    } catch (e) {
        console.log(`\nAn Error occured: ${e}`.red)
        return process.exit(0);
    }

    await fse.outputFile("help.txt", "love")

    console.log(`\nSuccessfully bootstrapped your new Node/Express API App\n`.green);
    return true;
}