// required imports
const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Square, Triangle } = require('./lib/shapes');

// creates the SVG file using the user's input
function writeToFile(fileName, answers) {
    let svg = '';

    //sets height and width
    svg = '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';

    //sets the text to the top layer
    svg +="<g>";

    svg += `${answers.shape}`;

    let theShape;
    if (answers.shape === "Triangle") {
        theShape = new Triangle();
        svg += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
    } else if (answers.shape === "Square") {
        theShape = new Square();
        svg += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
    } else {
        theShape = new Circle();
        svg += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`
    }


    svg += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
    svg += "</g>";
    svg += "</svg>";


    fs.writeFile(fileName, svg, (error) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Logo made! Have Fun!")
        }
    });
}

function userPrompt() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What letters do you want? (up to 3)",
                name: "text",
            },            
            {
                type: "input",
                message: "Text color? Hex# or keyword",
                name: "textColor",
            },
            {
                type: "list",
                message: "What shape we making?",
                choices: ["Circle","Square"," Triangle"],
                name: "shape",
            },
            {
                type: "input",
                message: "In what color? Hex# or keyword",
                name: "shapeBackgroundColor",
            },
        ])
        .then((answers) => {
            if (answers.text.length > 3) {
                console.log("3 letters, milord, not any number AFTER 3");
                userPrompt();
            } else {
                writeToFile("logo.svg", answers);
            }
        });
}

userPrompt();