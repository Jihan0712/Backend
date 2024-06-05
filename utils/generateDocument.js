const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');
const SmokeTest = require('../models/smokeModel');

const generateDocument = async (smokeId) => {
  try {
    const content = fs.readFileSync(path.resolve(__dirname, '../templates/Test_Print.docx'), 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip);

    const smoke = await SmokeTest.findById(smokeId);
    if (!smoke) {
      throw new Error(`No smoke data found with ID: ${smokeId}`);
    }

    const data = {
      mv_owner: smoke.owner || '',
      plate_no: smoke.plateNo || '',
      mv_type: smoke.mvType || '',
      engine_no: smoke.engineNo || '',
      color: smoke.color || '',
      chassis_no: smoke.chassisNo || '',
      classification: smoke.classification || '',
      year_model: smoke.yearModel || '',
      make_series: smoke.makeSeries || '',
      date_time_tested: smoke.dateTimeTested || '',
      given_this: smoke.givenThis || '',
      petc_it_provider: smoke.petcItProvider || '',
      valid_until: smoke.validUntil || '',
      opacity: smoke.opacity,
      result: smoke.smoke_result
    };

    doc.setData(data);
    doc.render();
    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    const outputPath = path.resolve(__dirname, '../output', `Test_Print_${smokeId}.docx`);
    fs.writeFileSync(outputPath, buf);
    return outputPath;
  } catch (error) {
    console.error('Error generating document:', error);
    throw error;
  }
};

module.exports = generateDocument;
