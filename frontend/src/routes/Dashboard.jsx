
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import SummaryCards from "../components/SummaryCards";
import FiltersPanel from "../components/FiltersPanel";
import SortDropdown from "../components/SortDropdown";
import SalesTable from "../components/SalesTable";
import Pagination from "../components/Pagination";
import Sidebar from "../layout/Sidebar";
import { fetchSalesData } from "../services/api";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    customerRegion: "",
    gender: "",
    ageRange: "",
    productCategory: "",
    tags: "",
    paymentMethod: "",
    dateFrom: "",
    dateTo: "",
  });

  const [sortBy, setSortBy] = useState(""); 
  const [page, setPage] = useState(1);
  const [salesData, setSalesData] = useState([]);

  const [totalUnits, setTotalUnits] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [amountSRs, setAmountSRs] = useState(0);
  const [discountSRs, setDiscountSRs] = useState(0);

  const hasActiveFilters = () => {
    return (
      filters.customerRegion ||
      filters.gender ||
      filters.ageRange ||
      filters.productCategory ||
      filters.tags ||
      filters.paymentMethod ||
      filters.dateFrom ||
      filters.dateTo
    );
  };

  const fetchData = async () => {
    
    let sortKey = null;
    let sortOrder = null;

    if (sortBy) {
      const parts = sortBy.split("_");
      sortOrder = parts.pop() || "asc"; 
      sortKey = parts.join("_"); 
    }

    const params = {
      search,
      page,
      limit: 10,
      customerRegion: filters.customerRegion ? [filters.customerRegion] : [],
      gender: filters.gender ? [filters.gender] : [],
      productCategory: filters.productCategory ? [filters.productCategory] : [],
      paymentMethod: filters.paymentMethod ? [filters.paymentMethod] : [],
      tags: filters.tags ? [filters.tags] : [],
      ageMin: filters.ageRange?.split("-")[0] || null,
      ageMax: filters.ageRange?.split("-")[1] || null,
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
      sortBy: sortKey,
      sortOrder: sortOrder,
    };

    console.log("🔼 Sending sortBy:", sortKey);
    console.log("🔼 Sending sortOrder:", sortOrder);

    const data = await fetchSalesData(params);
    setSalesData(data);

    let units = 0, amount = 0, discount = 0;
    let amountSRsCount = 0, discountSRsCount = 0;

    data.forEach((sale) => {
      const quantity = Number(sale.Quantity || 0);
      const final = Number(sale["Final Amount"] || 0);
      const total = Number(sale["Total Amount"] || 0);

      units += quantity;
      amount += final;
      discount += total - final;

      if (final > 0) amountSRsCount += 1;
      if (total - final > 0) discountSRsCount += 1;
    });

    setTotalUnits(units);
    setTotalAmount(amount);
    setTotalDiscount(discount);
    setAmountSRs(amountSRsCount);
    setDiscountSRs(discountSRsCount);
  };

  useEffect(() => {
    if (hasActiveFilters()) {
      fetchData();
    } else {
      setSalesData([]);
    }
  }, [search, filters, sortBy, page]);

  return (
    <div className="flex font-inter bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">

      <Sidebar />

      <div className="flex-1 min-h-screen p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Sales Management System</h1>
          <SearchBar search={search} onChange={setSearch} />
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <FiltersPanel filters={filters} setFilters={setFilters} />
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        {salesData.length > 0 && (
          <SummaryCards
            totalUnits={totalUnits}
            totalAmount={totalAmount}
            totalDiscount={totalDiscount}
            totalAmountCount={amountSRs}
            totalDiscountCount={discountSRs}
          />
        )}

        {salesData.length > 0 ? (
          <>
            <SalesTable data={salesData} />
            <Pagination page={page} setPage={setPage} salesData={salesData} />

          </>
        ) : (
          <p className="text-sm text-gray-500 mt-6 text-center">
            🔍 Please select at least one filter to view results.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
