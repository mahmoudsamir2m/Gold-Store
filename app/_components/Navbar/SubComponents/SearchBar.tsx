import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function SearchBar({ isMobile }: { isMobile: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");

  const toggleSearch = () => setIsExpanded(!isExpanded);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log("بحث عن:", query);
    }
  };

  return (
    <div
      className={`relative flex items-center ${isMobile ? "w-full" : "w-auto"}`}
    >
      {isExpanded ? (
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-1 w-full"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث..."
            className={`
              bg-gray-800 text-white rounded
              text-xs md:text-sm lg:text-base xl:text-lg
              px-2 md:px-3 lg:px-4 xl:px-5 py-1 md:py-2 
              focus:outline-none focus:ring-1 focus:ring-primary-500
              transition-all
              ${isMobile ? "w-30" : ""}
              grow 
            `}
            autoFocus
            onBlur={() => setTimeout(() => setIsExpanded(false), 200)}
          />
          <button
            type="submit"
            className="text-primary-400 hover:text-primary-300"
          >
            <FaSearch className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7" />
          </button>
        </form>
      ) : (
        <button
          onClick={toggleSearch}
          className="hover:text-primary-500 transition"
        >
          <FaSearch className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
        </button>
      )}
    </div>
  );
}
