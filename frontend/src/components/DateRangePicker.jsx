import React, { useState } from "react";

const DateRangePicker = ({ filters, setFilters }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const displayRange = filters.dateFrom && filters.dateTo
    ? `${filters.dateFrom} → ${filters.dateTo}`
    : "Date";

  return (
    <div className="relative">
      {/* Button or label */}
      <button
        onClick={() => setOpen(!open)}
        className="h-9 px-3 border text-sm rounded bg-gray-100 text-gray-700 min-w-[140px] text-left"
      >
        {displayRange}
      </button>

      {/* Calendar dropdown */}
      {open && (
        <div className="absolute z-10 bg-white border rounded shadow p-3 flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">From</label>
            <input
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleSelect}
              className="border px-2 py-1 rounded text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">To</label>
            <input
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleSelect}
              className="border px-2 py-1 rounded text-sm"
            />
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-sm text-blue-600 mt-1 self-end"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
