const pool = require("../utils/db");

async function getFilteredSales(filters) {
  const {
    search,
    customerRegion,
    gender,
    ageMin,
    ageMax,
    productCategory,
    tags,
    paymentMethod,
    dateFrom,
    dateTo,
    sortBy,
    sortOrder,
    page,
    limit,
  } = filters;

  const offset = (page - 1) * limit;
  const values = [];
  let whereClauses = [];

  if (search) {
    values.push(`%${search.toLowerCase()}%`);
    values.push(`%${search.toLowerCase()}%`);
    whereClauses.push(`(LOWER("Customer Name") LIKE $${values.length - 1} OR "Phone Number"::text LIKE $${values.length})`);
  }

  if (customerRegion.length) {
    const idx = values.length + 1;
    values.push(customerRegion);
    whereClauses.push(`"Customer Region" = ANY($${idx})`);
  }

  if (gender.length) {
    const idx = values.length + 1;
    values.push(gender);
    whereClauses.push(`"Gender" = ANY($${idx})`);
  }

  if (ageMin !== null) {
    values.push(ageMin);
    whereClauses.push(`"Age" >= $${values.length}`);
  }

  if (ageMax !== null) {
    values.push(ageMax);
    whereClauses.push(`"Age" <= $${values.length}`);
  }

  if (productCategory.length) {
    const idx = values.length + 1;
    values.push(productCategory);
    whereClauses.push(`"Product Category" = ANY($${idx})`);
  }

  if (tags.length) {
    tags.forEach(tag => {
      values.push(`%${tag.toLowerCase()}%`);
      whereClauses.push(`LOWER("Tags") LIKE $${values.length}`);
    });
  }

  if (paymentMethod.length) {
    const idx = values.length + 1;
    values.push(paymentMethod);
    whereClauses.push(`"Payment Method" = ANY($${idx})`);
  }

  
if (dateFrom && dateTo) {
  const fromDate = new Date(dateFrom);
  const toDate = new Date(dateTo);

  
  fromDate.setDate(fromDate.getDate() + 1);

 
  toDate.setDate(toDate.getDate() - 1);

  
  const adjustedFrom = fromDate.toISOString().split("T")[0];
  const adjustedTo = toDate.toISOString().split("T")[0];

  const idxFrom = values.length + 1;
  const idxTo = values.length + 2;
  values.push(adjustedFrom);
  values.push(adjustedTo);
  whereClauses.push(`"Date" >= $${idxFrom}::date AND "Date" <= $${idxTo}::date`);
}




let orderClause = "";

if (sortBy) {
  const sortKey = sortBy;
  const sortDir = (sortOrder || "asc").toUpperCase();

  const sortColumnMap = {
  customer_name: `COALESCE(LOWER(TRIM("Customer Name")), '')`,
  quantity: `"Quantity"`,
  date: `"Date"`,
};


  const sortColumn = sortColumnMap[sortKey];

  if (sortColumn) {
    orderClause = `ORDER BY ${sortColumn} ${sortDir}`;
  }
}


  const whereSQL = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";
  const query = `
    SELECT * FROM "TrueState_dataset"
    ${whereSQL}
    ${orderClause}
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `;

  values.push(limit);
  values.push(offset);

  const result = await pool.query(query, values);
  return result.rows;
}

module.exports = { getFilteredSales };
