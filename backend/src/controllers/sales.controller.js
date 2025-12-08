const { getFilteredSales } = require("../services/sales.service");

async function getSales(req, res) {
  try {
    const filters = {
  customerRegion: req.query.customerRegion || [],
  gender: req.query.gender || [],
  productCategory: req.query.productCategory || [],
  paymentMethod: req.query.paymentMethod || [],
  tags: req.query.tags || [],
  ageMin: req.query.ageMin || null,
  ageMax: req.query.ageMax || null,
  dateFrom: req.query.dateFrom || null,
  dateTo: req.query.dateTo || null,
  sortBy: req.query.sortBy || "date",
  sortOrder: req.query.sortOrder || "asc",
  page: parseInt(req.query.page) || 1,
  limit: parseInt(req.query.limit) || 10,
  search: req.query.search || "",
};

    const data = await getFilteredSales(filters);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed." });
  }
}

module.exports = { getSales };
