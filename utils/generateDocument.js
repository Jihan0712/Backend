const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const Vehicle = require('../models/vehicleModel'); // Import Vehicle model

const generateDocument = async (smoke) => {
  const vehicle = await Vehicle.findById(smoke.vehicleId); // Fetch vehicle data based on smoke

  const templatePath = path.join(__dirname, '..', 'templates', 'Test_Print.html');
  const template = fs.readFileSync(templatePath, 'utf-8');

  // Replace placeholders in the HTML template
  let html = template.replace('{{opacity}}', smoke.opacity);
  html = html.replace('{{smoke_result}}', smoke.smoke_result);

  if (vehicle) {
    html = html.replace('{{plateNo}}', vehicle.plateNo);
    html = html.replace('{{mvType}}', vehicle.mvType);
    html = html.replace('{{engineNo}}', vehicle.engineNo);
    html = html.replace('{{color}}', vehicle.color);
    html = html.replace('{{classification}}', vehicle.classification);
    html = html.replace('{{yearModel}}', vehicle.yearModel);
    html = html.replace('{{makeSeries}}', vehicle.makeSeries);
    html = html.replace('{{dateTimeTested}}', vehicle.dateTimeTested);
  }

  // Generate PDF using Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();

  return pdfBuffer;
};

module.exports = generateDocument;
