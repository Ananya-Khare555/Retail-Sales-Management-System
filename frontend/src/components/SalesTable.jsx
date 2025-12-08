


import React from 'react'

const SalesTable = ({ data }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-2">Transaction ID</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Customer ID</th>
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Product Category</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Total Amount</th>
            <th className="px-4 py-2">Customer Region</th>
            <th className="px-4 py-2">Product ID</th>
            <th className="px-4 py-2">Employee Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{row["Transaction ID"] || "-"}</td>
              <td className="px-4 py-2">{row["Date"]?.split("T")[0]}</td>
              <td className="px-4 py-2">{row["Customer ID"]}</td>
              <td className="px-4 py-2">{row["Customer Name"]}</td>
              <td className="px-4 py-2">{row["Phone Number"]}</td>
              <td className="px-4 py-2">{row["Gender"]}</td>
              <td className="px-4 py-2">{row["Age"]}</td>
              <td className="px-4 py-2">{row["Product Category"]}</td>
              <td className="px-4 py-2">{row["Quantity"]}</td>
              <td className="px-4 py-2">₹{row["Total Amount"]}</td>
              <td className="px-4 py-2">{row["Customer Region"]}</td>
              <td className="px-4 py-2">{row["Product ID"]}</td>
              <td className="px-4 py-2">{row["Employee Name"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SalesTable
