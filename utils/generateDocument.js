const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const generateDocument = async (data) => {
  const templatePath = path.join(__dirname, '../templates/test_print.html');
  const template = fs.readFileSync(templatePath, 'utf-8');
  const html = ejs.render(template, data);
  return html;
};

module.exports = generateDocument;
