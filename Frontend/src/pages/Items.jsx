import React, { useState, useMemo, useEffect } from "react";
import { Plus } from "lucide-react";
import ItemCard from "../components/ItemCard";
import ItemDetails from "../components/ItemDetails";
import { getItems } from "../services/api";
import { useNavigate } from "react-router-dom";

const Items = () => {
   const navigate = useNavigate();
  // State - initialize as empty
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State
  const [filters, setFilters] = useState({
    search: "",
    category: "All Categories",
    mode: "All Modes",
    minPrice: "",
    maxPrice: "",
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [requestStatus, setRequestStatus] = useState({});

  // Fetch items from database
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await getItems();
        if (response.data.success) {
          setItems(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch items");
        }
      } catch (err) {
        console.error("Error fetching items:", err);
        setError(err.response?.data?.message || "Error fetching items from database");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Filter items based on criteria
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesCategory =
        filters.category === "All Categories" || item.category === filters.category;
      const matchesMode =
        filters.mode === "All Modes" || item.mode === filters.mode;
      const minPrice = filters.minPrice === "" ? 0 : parseInt(filters.minPrice);
      const maxPrice = filters.maxPrice === "" ? Infinity : parseInt(filters.maxPrice);
      const matchesPrice = item.price >= minPrice && item.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesMode && matchesPrice;
    });
  }, [filters, items]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset filters
  const handleReset = () => {
    setFilters({
      search: "",
      category: "All Categories",
      mode: "All Modes",
      minPrice: "",
      maxPrice: "",
    });
  };

  // Handle request/claim
  const handleRequestClaim = (itemId, itemMode) => {
    setRequestStatus((prev) => ({
      ...prev,
      [itemId]: "requested",
    }));
    // In real app, send request to backend
    alert(
      itemMode === "Give Away"
        ? "Item claimed! You will be notified once confirmed."
        : "Request sent to owner! Check your messages for updates."
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between  mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Finding Items</h1>
          <p className="text-gray-500 text-sm mt-1">
            Browse and request items from your college community
          </p>
        </div>

        <button 
         onClick={()=>navigate('/add-item')}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          <Plus size={16} />
          List Item
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-3">
          <input
            type="text"
            name="search"
            placeholder="Search items..."
            value={filters.search}
            onChange={handleFilterChange}
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Categories</option>
            <option>Books</option>
            <option>Electronics</option>
            <option>Sports</option>
            <option>Stationery</option>
            <option>Clothing</option>
            <option>Furniture</option>
            <option>Musical Instruments</option>
            <option>Kitchen</option>
            <option>Other</option>
          </select>

          <select
            name="mode"
            value={filters.mode}
            onChange={handleFilterChange}
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Modes</option>
            <option>Sell</option>
            <option>Rent</option>
            <option>Give Away</option>
          </select>

          <input
            type="number"
            name="minPrice"
            placeholder="Min ₹"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="maxPrice"
            placeholder="Max ₹"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleReset}
            className="bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-80 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading items...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg shadow-sm p-4">
          <p className="text-red-700">Error: {error}</p>
        </div>
      )}

      {/* Items Grid */}
      {!loading && !error && filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id || item.id}
              item={item}
              onSelect={setSelectedItem}
            />
          ))}
        </div>
      ) : !loading && !error ? (
        /* Empty State */
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-80 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-3xl">
            🔍
          </div>

          <h2 className="text-lg font-semibold text-slate-700">No items found</h2>

          <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
        </div>
      ) : null}

      {/* Detail Modal */}
      {selectedItem && (
        <ItemDetails
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onRequest={handleRequestClaim}
        />
      )}
    </div>
  );
};
export default Items;