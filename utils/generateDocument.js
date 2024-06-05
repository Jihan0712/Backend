const pdf = require('html-pdf');

const generateDocument = (html, res) => {
  const options = { format: 'Letter' };

  pdf.create(html, options).toStream((err, stream) => {
    if (err) {
      console.error('Error generating PDF:', err);
      return res.status(500).json({ error: 'Error generating document' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=Test_Print.pdf');
    stream.pipe(res);
  });
};

module.exports = generateDocument;
