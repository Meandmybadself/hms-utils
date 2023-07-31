const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Function to recursively process the directory
function processDirectory(directoryPath, targetElementSelector) {
    fs.readdirSync(directoryPath).forEach((file) => {
        const filePath = path.join(directoryPath, file);

        if (fs.statSync(filePath).isDirectory()) {
            processDirectory(filePath, targetElementSelector);
        } else if (filePath.endsWith('.html')) {
            removeElementFromHtmlFile(filePath, targetElementSelector);
        }
    });
}

// Function to remove the DOM element from the HTML file
function removeElementFromHtmlFile(filePath, targetElementSelector) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${filePath}`, err);
            return;
        }

        const $ = cheerio.load(data);
        const targetElement = $(targetElementSelector);

        if (targetElement.length === 0) {
            console.log(`Element not found in file: ${filePath}`);
            return;
        }

        targetElement.remove();

        fs.writeFile(filePath, $.html(), 'utf-8', (err) => {
            if (err) {
                console.error(`Error writing to file: ${filePath}`, err);
            } else {
                console.log(`Element removed from file: ${filePath}`);
            }
        });
    });
}

const targetElementSelector = 'footer'; // Replace with your desired element selector
processDirectory(process.env.TARGET_DIRECTORY, targetElementSelector);
