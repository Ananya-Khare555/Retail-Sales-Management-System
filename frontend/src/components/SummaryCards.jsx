

import React from 'react'

const SummaryCards = ({ totalUnits, totalAmount, totalDiscount, totalAmountCount, totalDiscountCount }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
      <div className="bg-white rounded shadow p-4">
        <p className="text-sm text-gray-500">Total units sold</p>
        <p className="text-xl font-bold">{totalUnits}</p>
      </div>
      <div className="bg-white rounded shadow p-4">
        <p className="text-sm text-gray-500">Total Amount</p>
        <p className="text-xl font-bold">
          ₹{totalAmount.toLocaleString()}{" "}
          <span className="text-sm text-gray-400">({totalAmountCount} SRs)</span>
        </p>
      </div>
      <div className="bg-white rounded shadow p-4">
        <p className="text-sm text-gray-500">Total Discount</p>
        <p className="text-xl font-bold">
          ₹{totalDiscount.toLocaleString()}{" "}
          <span className="text-sm text-gray-400">({totalDiscountCount} SRs)</span>
        </p>
      </div>
    </div>
  )
}

export default SummaryCards
