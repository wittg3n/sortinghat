// backend/src/controllers/items.js
const db = require('../config/db');

const getItems = async (req, res) => {
  try {
    const [rows, fields] = await db.promise().query('SELECT * FROM items');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

module.exports = {
  getItems,
};