const fs = require('fs');
const { processDirectory } = require('./utils');

const targetElementSelector = 'header.mkdf-page-header'; // Replace with your desired element selector
const replacementText = fs.readFileSync('./2023-07-30-header.html', 'utf-8')

processDirectory(process.env.TARGET_DIRECTORY, targetElementSelector, replacementText);