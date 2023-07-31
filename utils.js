const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Function to recursively process the directory
export function processDirectory(directoryPath, targetElementSelector, replacementText) {
    fs.readdirSync(directoryPath).forEach((file) => {
        const filePath = path.join(directoryPath, file);

        if (fs.statSync(filePath).isDirectory()) {
            processDirectory(filePath, targetElementSelector, replacementText);
        } else if (filePath.endsWith('.html')) {
            modifyHtmlFile(filePath, targetElementSelector, replacementText);
        }
    });
}

// Function to modify the HTML file
export function modifyHtmlFile(filePath, targetElementSelector, replacementText) {
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

        targetElement.replaceWith(replacementText)

        fs.writeFile(filePath, $.html(), 'utf-8', (err) => {
            if (err) {
                console.error(`Error writing to file: ${filePath}`, err);
            } else {
                console.log(`File modified: ${filePath}`);
            }
        });
    });
}
