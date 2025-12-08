const express = require('express');
const router = express.Router();
const pool = require('../utils/db');


router.get('/tags', async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT UNNEST(string_to_array("Tags", \',\')) AS tag FROM "TrueState_dataset"');
    const tags = [...new Set(result.rows.map(row => row.tag.trim()))];
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});



module.exports = router;
