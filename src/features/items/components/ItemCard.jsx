import "../../../styles/ItemCard.css";

// Displays a single lost/found item as a card
export default function ItemCard({ item }) {
  const formattedDate = item.date
    ? new Date(item.date).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="item-card">
      
      {/* Item image */}
      <div className="item-card-image">
        {(item.imagePreview || item.image_url) ? (
          <img
            src={item.imagePreview || `${import.meta.env.VITE_API_BASE_URL}${item.image_url}`}
            alt={item.title}
            style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "6px" }}
          />
        ) : (
          "No Image"
        )}
      </div>

      {/* Item information */}
      <div className="item-card-body">
        <div className="item-card-header">
          <h3 className="item-card-title">{item.title}</h3>

          <span className={`item-status-badge ${item.status?.toLowerCase()}`}>
            {(item.status || "ACTIVE").toUpperCase()}
          </span>
        </div>

        <p className="item-card-description">{item.description}</p>
        <p className="item-card-meta">Location: {item.location}</p>
        <p className="item-card-meta">Date Lost: {formattedDate}</p>
      </div>

    </div>
  );
}