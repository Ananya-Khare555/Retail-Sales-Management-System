import React from 'react'

const Pagination = ({ page, setPage, salesData = [] }) => {   // 👈 default to empty array
  const prev = () => setPage(prev => Math.max(prev - 1, 1))

  const next = () => {
    if (salesData.length === 10) {
      setPage(prev => prev + 1)
    }
  }

  return (
    <div className="flex items-center justify-center mt-4 gap-4">
      <button
        onClick={prev}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Previous
      </button>

      <span className="text-sm text-gray-700">Page {page}</span>

      <button
        onClick={next}
        className={`px-4 py-2 rounded 
            ${salesData.length === 10 
              ? "bg-gray-200 hover:bg-gray-300 cursor-pointer" 
              : "bg-gray-100 cursor-not-allowed opacity-50"
            }`}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
