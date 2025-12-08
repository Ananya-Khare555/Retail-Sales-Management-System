


const SortDropdown = ({ sortBy, setSortBy }) => {
  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="h-10 px-3 border rounded bg-white text-sm"
    >
      <option value="">Sort by</option> 
      <option value="customer_name_asc">Customer Name (A–Z)</option>
      <option value="date_desc">Date (Newest)</option>
      <option value="quantity_asc">Quantity (Low → High)</option>
    </select>
  );
};

export default SortDropdown;

