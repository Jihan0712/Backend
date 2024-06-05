const SmokeTest = require('../models/smokeModel');
const Vehicle = require('../models/vehicleModel'); // Ensure this model is imported if needed
const User = require('../models/userModel');
const mongoose = require('mongoose');
const generateDocument = require('../utils/generateDocument');

//print
const printSmoke = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such data' });
  }

  try {
    const smoke = await SmokeTest.findById(id).populate('vehicle');

    if (!smoke) {
      return res.status(404).json({ error: 'No such data' });
    }

    const htmlTemplate = `
      <p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;margin-top:9.0pt;margin-right:0cm;margin-bottom:9.0pt;margin-left:0cm;'>&nbsp;</p>
      <table style="width: 4.7e+2pt;border-collapse:collapse;border:none;">
          <tbody>
              <tr>
                  <td style="width: 468pt;border: 1pt solid black;padding: 5pt;vertical-align: top;">
                      <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;border:none;'><strong>MV OWNER:</strong> </p>
                  </td>
              </tr>
          </tbody>
      </table>
      <p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;margin-top:9.0pt;margin-right:0cm;margin-bottom:9.0pt;margin-left:0cm;'>&nbsp;</p>
      <table style="width: 4.7e+2pt;border-collapse:collapse;border:none;">
          <tbody>
              <tr>
                  <td colspan="2" style="width: 468pt;border: 1pt solid black;background: rgb(67, 67, 67);padding: 5pt;height: 21pt;vertical-align: top;">
                      <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;text-align:center;border:none;'><strong><span style="color:white;">VEHICLE DETAILS</span></strong></p>
                  </td>
              </tr>
              <tr>
                  <td style="width: 234pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;padding: 5pt;vertical-align: top;">
                      <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;border:none;'><strong>PLATE NO:</strong> </p>
                  </td>
                  <td style="width: 234pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 5pt;vertical-align: top;">
                      <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><strong>MV TYPE:</strong> </p>
                  </td>
              </tr>
              <tr>
                  <td style="width: 234pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;padding: 5pt;vertical-align: top;">
                      <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><strong>ENGINE NO:</strong> </p>
                  </td>
                  <td style="width: 234pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 5pt;vertical-align: top;">
                      <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><strong>COLOR:</strong> </p>
                  </td>
              </tr>
              <tr>
                  <td style="width: 234pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;padding: 5pt;vertical-align: top;">
                      <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><strong>CHASSIS NO:</strong> $</p>
                  </td>
                  <td style="width: 234pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 5pt;vertical-align: top;">
                      <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><strong>CLASSIFICATION:</strong> </p>
                  </td>
              </tr>
              <tr>
                  <td style="width: 234pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;padding: 5pt;vertical-align: top;">
                      <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><strong>YEAR MODEL:</strong> </p>
                  </td>
                  <td style="width: 234pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 5pt;vertical-align: top;">
                      <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><strong>MAKE/SERIES:</strong> </p>
                  </td>
              </tr>
              <tr>
                  <td colspan="2" style="width: 468pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;padding: 5pt;height: 21pt;vertical-align: top;">
                      <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><strong>DATE/TIME TESTED:</strong> </p>
                  </td>
              </tr>
          </tbody>
      </table>
      <p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;margin-top:9.0pt;margin-right:0cm;margin-bottom:9.0pt;margin-left:0cm;'>&nbsp;</p>
      <table style="width: 4.7e+2pt;border-collapse:collapse;border:none;">
          <tbody>
              <tr>
                  <td style="width: 234pt;border: 1pt solid black;padding: 5pt;height: 21pt;vertical-align: top;">
                      <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;border:none;'><strong>GIVEN THIS:</strong> </p>
                  </td>
                  <td rowspan="2" style="width: 234pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 5pt;height: 21pt;vertical-align: top;">
                      <p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;margin-top:9.0pt;margin-right:0cm;margin-bottom:  9.0pt;margin-left:0cm;'><strong>P.E.T.C. & I.T. PROVIDER:</strong> </p>
                  </td>
              </tr>
              <tr>
                  <td style="width: 234pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;padding: 5pt;height: 21pt;vertical-align: top;">
                      <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;border:none;'><strong>VALID UNTIL:</strong> </p>
                  </td>
              </tr>
          </tbody>
      </table>
      <p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;margin-top:9.0pt;margin-right:0cm;margin-bottom:9.0pt;margin-left:0cm;'>&nbsp;</p>
      <table style="width: 4.7e+2pt;border-collapse:collapse;border:none;">
          <tbody>
              <tr>
                  <td style="width: 468pt;border: 1pt solid black;background: rgb(67, 67, 67);padding: 5pt;vertical-align: top;">
                      <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;text-align:center;border:none;'><strong><span style="color:white;">TESTING RESULT</span></strong></p>
                  </td>
              </tr>
              <tr>
                  <td style="width: 468pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;padding: 5pt;vertical-align: top;">
                      <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;border:none;'><strong>OPACITY:</strong> ${smoke.opacity}</p>
                  </td>
              </tr>
              <tr>
                  <td style="width: 468pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;padding: 5pt;vertical-align: top;">
                      <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;border:none;'><strong>RESULT:</strong> ${smoke.smoke_result}</p>
                  </td>
              </tr>
          </tbody>
      </table>
      <p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;margin-top:9.0pt;margin-right:0cm;margin-bottom:9.0pt;margin-left:0cm;'>&nbsp;</p>
      <p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'>&nbsp;</p>
    `;

    generateDocument(htmlTemplate, res);
  } catch (error) {
    console.error('Error generating document:', error);
    res.status(500).json({ error: 'Error generating document' });
  }
};


// get all smokes
const getSmokes = async (req, res) => {
  const smokes = await SmokeTest.find({}).sort({createdAt: -1})

  res.status(200).json(smokes)
}

// get a single smoke
const getSmoke = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such data'})
  }

  const smoke = await SmokeTest.findById(id)

  if (!smoke) {
    return res.status(404).json({error: 'No such data'})
  }
  
  res.status(200).json(smoke)
}


// create a new smoke
const createSmoke = async (req, res) => {
  const {opacity, smoke_result} = req.body

  // add to the database
  try {
    const smoke = await SmokeTest.create({ opacity, smoke_result })
    res.status(200).json(smoke)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


// delete a smoke
const deleteSmoke = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such smoke result'})
  }

  const smoke = await SmokeTest.findOneAndDelete({_id: id})

  if (!smoke) {
    return res.status(400).json({error: 'No such smoke result'})
  }

  res.status(200).json(smoke)
}

// update a smoke
const updateSmoke = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such smoke'})
  }

  const smoke = await SmokeTest.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!smoke) {
    return res.status(400).json({error: 'No such smoke'})
  }

  res.status(200).json(smoke)
}


// Get vehicle details
const getVehicleDetails = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such vehicle' });
  }

  const vehicle = await Vehicle.findById(id);

  if (!vehicle) {
    return res.status(404).json({ error: 'No such vehicle' });
  }

  res.status(200).json(vehicle);
};


module.exports = {
  createSmoke,
  getSmokes,
  getSmoke,
  deleteSmoke,
  updateSmoke,
  printSmoke,
};