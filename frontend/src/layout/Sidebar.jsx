

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-white to-indigo-50 shadow-lg border-r border-indigo-100 hidden sm:flex flex-col p-6 text-sm font-inter">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight leading-tight">
        Vault
        </h2>
        <p className="text-xs text-gray-500 mt-1 ml-1">Ananya Khare</p> 
      </div>

      <div className="mb-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Services</h3>
        <ul className="space-y-3">
          <li className="text-indigo-800 hover:text-indigo-600 font-medium cursor-pointer transition">Pre-active</li>
          <li className="text-indigo-800 hover:text-indigo-600 font-medium cursor-pointer transition">Active</li>
          <li className="text-indigo-800 hover:text-indigo-600 font-medium cursor-pointer transition">Blocked</li>
          <li className="text-indigo-800 hover:text-indigo-600 font-medium cursor-pointer transition">Closed</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Invoices</h3>
        <ul className="space-y-3">
          <li className="text-indigo-800 hover:text-indigo-600 font-medium cursor-pointer transition">Proforma Invoices</li>
          <li className="text-indigo-800 hover:text-indigo-600 font-medium cursor-pointer transition">Final Invoices</li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
