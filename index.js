#!/usr/bin/env node
const inquirer = require("inquirer");
const colors = require("colors");
const app = require("./node-express-api-app");

console.log("\n");
console.log(colors.bold("Boostrap a Node/Express API Application Boilerplate."));
console.log(`

█▄  █ █▀▀█ █▀▀▄ █▀▀   █▀▀▀ █ █ █▀▀█ █▀▀█ █▀▀ █▀▀ █▀▀ 
█ █ █ █  █ █  █ █▀▀   █▀▀▀ ▄▀▄ █  █ █▄▄▀ █▀▀ ▀▀█ ▀▀█ 
█  ▀█ ▀▀▀▀ ▀▀▀  ▀▀▀   █▄▄▄ ▀ ▀ █▀▀▀ █ ▀█ ▀▀▀ ▀▀▀ ▀▀▀ 

█▀▀█  █▀▀█ ▀█▀ 　  █▀▀█ █▀▀█ █▀▀█ 
█▄▄█  █▄▄█  █  　  █▄▄█ █  █ █  █ 
█  █  █    ▄█▄ 　  █  █ █▀▀▀ █▀▀▀`.white.bgBlack);

console.log("\n");

const strToSlug = str => {

	//replace all non word characters with space
	const replaceNonWord = str.toLowerCase().replace(/\W+/gi, ' ');

	//replace underscores with spaces
	const replaceUnderScores = replaceNonWord.replace(/_/gi, ' ');

	// replace all space with single dash
	const replaceSpace = replaceUnderScores.trim().replace(/\s+/gi, '-');

	return replaceSpace;

}

// a function to return inquire prompt
const askAppQuestion1 = () => {
    const questions = [
        {
            type: "input",
            name: "appName",
            message: "What name should your app be?"
        }
    ];

    return inquirer.prompt(questions);
}

// a function to return inquire prompt
const askAppQuestion2 = (appName) => {
    const questions = [
        {
            type: "list",
            name: "shouldTrulySetup",
            message: `Bootstrap a Node/Express App for "${appName}"?`,
            choices: ["yes", "no"]
        }
    ];

    return inquirer.prompt(questions);
}

const runCli = async () => {
    const answer1 = await askAppQuestion1();
    const { appName } = answer1;
    
    if (!appName || appName.length <= 0) {
        console.log(`SETUP FAILED: Please enter a valid name for your new app.\n\n`.red);
        return process.exit(0);
    }
    
    const appNameSlug = strToSlug(appName);

    const answer2 = await askAppQuestion2(appNameSlug);
    const { shouldTrulySetup } = answer2;

    if (shouldTrulySetup !== "yes") {
        console.log(`\nSetup for "${appNameSlug}" cancelled\n\n`.red);
        return process.exit(0);
    }

    const appDirectory = `${process.cwd()}/${appNameSlug}`;

    const res = await app.create(appName, appDirectory);

    if (!res) {
        console.log("There was an error setting up the boilerplate.". red);
        return process.exit(0);
    }

    return process.exit(0);
}


runCli();