// controllers/exportController.js

const { ProductDB } = require('../models/productDB'); // Import your ProductDB model or relevant database logic

const exportDataAsCSV = async (req, res) => {
  try {
    const purchases = await ProductDB.find({}, '-_id -__v');
    if (purchases.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }

    const csvFields = Object.keys(purchases[0].toJSON());
    const csvData = [
      csvFields.join(','),
      ...purchases.map((purchase) =>
        csvFields.map((field) => purchase[field]).join(',')
      ),
    ];
    const csv = csvData.join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=purchase_data.csv');

    res.status(200).send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  exportDataAsCSV,
};
