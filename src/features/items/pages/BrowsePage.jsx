import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import "../../../styles/BrowsePage.css";

// Mock listings
const mockItems = [
  {
    id: 1,
    title: "Black Wallet",
    description: "Black leather wallet with credit cards inside",
    location: "Main Library",
    date: "2026-02-20",
    category: "Accessories",
    type: "Lost",
    status: "Pending",
  },
  {
    id: 2,
    title: "AirPods Case",
    description: "White AirPods Pro case with scratches",
    location: "Student Center cafeteria",
    date: "2026-02-22",
    category: "Electronics",
    type: "Lost",
    status: "Approved",
  },
  {
    id: 3,
    title: "Blue Backpack",
    description: "Backpack found with notebooks inside",
    location: "Gym",
    date: "2026-02-24",
    category: "Bags",
    type: "Found",
    status: "Found",
  },
  {
    id: 4,
    title: "Student ID Card",
    description: "George Brown student ID found near the cafeteria",
    location: "Student Center",
    date: "2026-02-25",
    category: "Accessories",
    type: "Found",
    status: "Lost",
  },
];

export default function BrowsePage() {
  const navigate = useNavigate();
  const [view, setView] = useState("grid");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);
  const [hasLoadedBackend, setHasLoadedBackend] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedDateFilter, setSelectedDateFilter] = useState("All Dates");

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError("");

      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

        if (!apiBaseUrl) {
          throw new Error("API is not set. Check your .env file.");
        }

        const response = await fetch(`${apiBaseUrl}/items`);

        if (!response.ok) {
          throw new Error("Failed to load items.");
        }

        const data = await response.json();
        const rawItems = Array.isArray(data) ? data : data.items || [];

        const categoryMap = {
          1: "Electronics",
          2: "Clothing",
          3: "Accessories",
          4: "Books & Notes",
          5: "ID & Cards",
          6: "Sports & Gym",
          7: "Other",
        };

        const normalizedItems = rawItems.map((item) => ({
          id: item.id,
          title: item.title || "Untitled Item",
          description: item.description || "",
          location:
            item.location ||
            item.location_details ||
            item.display_name ||
            "Unknown Location",
          date: item.date || "",
          category:
            item.category ||
            item.category_name ||
            categoryMap[item.category_id] ||
            "Other",
          type: item.type
            ? item.type.charAt(0).toUpperCase() + item.type.slice(1)
            : "Lost",
          status: item.status
            ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
            : "Active",
          imagePreview: item.imagePreview || item.image_url || "",
        }));

        setItems(normalizedItems);
      } catch (err) {
        setError(err.message || "Failed to load items.");
        setItems([]);
      } finally {
        setLoading(false);
        setHasLoadedBackend(true);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Use backend items once loaded, otherwise fall back to mock items.
  const allItems = hasLoadedBackend ? items : mockItems;

  const filteredItems = allItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      item.category === selectedCategory;

    const search = debouncedSearchTerm.toLowerCase();

    const matchesSearch =
      (item.title || "").toLowerCase().includes(search) ||
      (item.description || "").toLowerCase().includes(search) ||
      (item.location || "").toLowerCase().includes(search);

    const itemDate = item.date ? new Date(item.date) : null;
    const now = new Date();
    const diffTime = itemDate ? now - itemDate : null;
    const diffDays = diffTime ? diffTime / (1000 * 60 * 60 * 24) : null;

    const matchesDate =
      selectedDateFilter === "All Dates" ||
      (itemDate && selectedDateFilter === "Last 24 Hours" && diffDays <= 1) ||
      (itemDate && selectedDateFilter === "Last Week" && diffDays <= 7) ||
      (itemDate && selectedDateFilter === "Last Month" && diffDays <= 30);

    return matchesCategory && matchesSearch && matchesDate;
  });

  return (
    <div className="browse-page">
      <div className="browse-header">
        <h1>Lost & Found Listings</h1>
        <button onClick={() => navigate("/report")}>Report Item</button>
      </div>

      <div className="browse-search">
        <input
          type="text"
          placeholder="Search items..."
          className="browse-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="browse-filters">
        <div className="browse-filter-box">
          <label>Filter by Category</label>
          <select
            className="browse-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Bags</option>
            <option>Accessories</option>
          </select>
        </div>

        <div className="browse-filter-box">
          <label>Filter by Date</label>
          <select
            className="browse-select"
            value={selectedDateFilter}
            onChange={(e) => setSelectedDateFilter(e.target.value)}
          >
            <option>All Dates</option>
            <option>Last 24 Hours</option>
            <option>Last Week</option>
            <option>Last Month</option>
          </select>
        </div>
      </div>

      <div className="browse-view-toggle">
        <button onClick={() => setView("grid")}>Grid View</button>
        <button onClick={() => setView("list")} className="toggle-button">
          List View
        </button>
      </div>

      <div
        className={`browse-items ${view === "grid" ? "grid-view" : "list-view"}`}
      >
        {loading ? (
          <>
            <div className="item-card item-card-skeleton">
              <div className="skeleton skeleton-image"></div>
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text short"></div>
            </div>
            <div className="item-card item-card-skeleton">
              <div className="skeleton skeleton-image"></div>
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text short"></div>
            </div>
            <div className="item-card item-card-skeleton">
              <div className="skeleton skeleton-image"></div>
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text short"></div>
            </div>
          </>
        ) : error ? (
          <div className="item-card browse-message-card">{error}</div>
        ) : filteredItems.length === 0 ? (
          <div className="item-card browse-message-card">No items found.</div>
        ) : (
          filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={{ ...item, status: item.status || "active" }}
            />
          ))
        )}
      </div>
    </div>
  );
}