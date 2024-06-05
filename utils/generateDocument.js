const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const pdf = require('html-pdf');
const Vehicle = require('../models/vehicleModel'); // Import Vehicle model

const generateDocument = async (smoke) => {
  const vehicle = await Vehicle.findById(smoke.vehicleId); // Fetch vehicle data based on smoke

  const templatePath = path.join(__dirname, '..', 'templates', 'Test_Print.html');
  const template = fs.readFileSync(templatePath, 'utf-8');

  const dom = new JSDOM(template);
  const document = dom.window.document;

  document.querySelector('#opacity').textContent = smoke.opacity;
  document.querySelector('#smoke_result').textContent = smoke.smoke_result;

  // Populate vehicle details
  if (vehicle) {
    document.querySelector('#plateNo').textContent = vehicle.plateNo;
    document.querySelector('#mvType').textContent = vehicle.mvType;
    document.querySelector('#engineNo').textContent = vehicle.engineNo;
    document.querySelector('#color').textContent = vehicle.color;
    document.querySelector('#classification').textContent = vehicle.classification;
    document.querySelector('#yearModel').textContent = vehicle.yearModel;
    document.querySelector('#makeSeries').textContent = vehicle.makeSeries;
    document.querySelector('#dateTimeTested').textContent = vehicle.dateTimeTested;
  }

  const pdfOptions = { format: 'A4' };
  const html = dom.serialize();

  return new Promise((resolve, reject) => {
    pdf.create(html, pdfOptions).toStream((err, stream) => {
      if (err) {
        return reject(err);
      }
      resolve(stream);
    });
  });
};

module.exports = generateDocument;
