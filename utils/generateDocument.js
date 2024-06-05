// utils/generateDocument.js
const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

function generateDocument(smokeData) {
  // Load the docx file as binary content
  const content = fs.readFileSync(path.resolve(__dirname, '../templates/Test_Print.docx'), 'binary');

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // Set the template variables
  doc.setData({
    mvOwner: smokeData.owner,
    plateNo: smokeData.plate_no,
    mvType: smokeData.mvType,
    engineNo: smokeData.engine_no,
    color: smokeData.color,
    chassisNo: smokeData.chassis_no,
    classification: smokeData.classification,
    yearModel: smokeData.year_model,
    makeSeries: smokeData.make_series,
    dateTimeTested: smokeData.date_time_tested,
    givenThis: smokeData.given_this,
    petcItProvider: smokeData.petc_it_provider,
    validUntil: smokeData.valid_until,
    opacity: smokeData.opacity,
    result: smokeData.result,
  });

  try {
    // Render the document
    doc.render();
  } catch (error) {
    console.error(error);
    throw error;
  }

  const buf = doc.getZip().generate({ type: 'nodebuffer' });

  // Save the document
  fs.writeFileSync(path.resolve(__dirname, '../public/output.docx'), buf);
}

module.exports = generateDocument;
