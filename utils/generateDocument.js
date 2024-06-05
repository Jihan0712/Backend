const fs = require('fs');
const path = require('path');
const SmokeTest = require('../models/smokeModel');

const generateDocument = async (smokeId) => {
  try {
    const templatePath = path.resolve(__dirname, '../templates/template.html');
    const templateContent = fs.readFileSync(templatePath, 'utf8');

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

    let documentContent = templateContent;
    for (const key in data) {
      const value = data[key];
      documentContent = documentContent.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }

    const outputPath = path.resolve(__dirname, '../output', `Test_Print_${smokeId}.html`);
    fs.writeFileSync(outputPath, documentContent, 'utf8');
    return outputPath;
  } catch (error) {
    console.error('Error generating document:', error);
    throw error;
  }
};

module.exports = generateDocument;
