


import React, { useEffect, useState } from "react";
import axios from "axios";
import DateRangePicker from "./DateRangePicker";
import { BASE_URL } from "../config";

const FiltersPanel = ({ filters, setFilters }) => {
  const [tagsList, setTagsList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/tags`);
        setTagsList(res.data || []);
      } catch (err) {
        console.error("Failed to load tags", err);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3">

      {/* Customer Region */}
      <select name="customerRegion" value={filters.customerRegion} onChange={handleChange} className="h-9 px-3 border text-sm rounded bg-gray-100 text-gray-700">
        <option value="">Customer Region</option>
        <option value="Central">Central</option>
        <option value="East">East</option>
        <option value="North">North</option>
        <option value="South">South</option>
        <option value="West">West</option>
      </select>

      {/* Gender */}
      <select name="gender" value={filters.gender} onChange={handleChange} className="h-9 px-3 border text-sm rounded bg-gray-100 text-gray-700">
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      {/* Age Range */}
      <select name="ageRange" value={filters.ageRange} onChange={handleChange} className="h-9 px-3 border text-sm rounded bg-gray-100 text-gray-700">
        <option value="">Age Range</option>
        <option value="18-25">18–25</option>
        <option value="26-35">26–35</option>
        <option value="36-50">36–50</option>
        <option value="51+">51+</option>
      </select>

      {/* Product Category */}
      <select name="productCategory" value={filters.productCategory} onChange={handleChange} className="h-9 px-3 border text-sm rounded bg-gray-100 text-gray-700">
        <option value="">Product Category</option>
        <option value="Beauty">Beauty</option>
        <option value="Clothing">Clothing</option>
        <option value="Electronics">Electronics</option>
      </select>

      {/* Tags (from API) */}
      <select name="tags" value={filters.tags} onChange={handleChange} className="h-9 px-3 border text-sm rounded bg-gray-100 text-gray-700">
        <option value="">Tags</option>
        {tagsList.map((tag) => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </select>

      {/* Payment Method */}
      <select name="paymentMethod" value={filters.paymentMethod} onChange={handleChange} className="h-9 px-3 border text-sm rounded bg-gray-100 text-gray-700">
        <option value="">Payment Method</option>
        <option value="Cash">Cash</option>
        <option value="Credit Card">Credit Card</option>
        <option value="Debit Card">Debit Card</option>
        <option value="Net Banking">Net Banking</option>
        <option value="UPI">UPI</option>
        <option value="Wallet">Wallet</option>
      </select>

      {/* Date Range Dropdown */}
      <DateRangePicker filters={filters} setFilters={setFilters} />

    </div>
  );
};

export default FiltersPanel;
