

const SearchBar = ({ search, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by Name, Phone..."
      value={search}
      onChange={(e) => onChange(e.target.value)}
      className="w-[350px] h-10 px-4 border border-gray-300 rounded-md shadow-sm text-sm"
    />
  );
};

export default SearchBar;
