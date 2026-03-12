import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/MyReportsPage.css";
import { getToken } from "../../../services/authStorage";

export default function MyReportsPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "3",
    type: "Lost",
    location_details: "",
    date: "",
    image: null,
    imagePreview: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);

      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: previewUrl,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

      if (!apiBaseUrl) {
        throw new Error("API is not set. Check your .env file.");
      }

      const payload = {
        user_id: 2,
        category_id: Number(formData.category_id),
        location_id: 1,
        title: formData.title,
        description: formData.description,
        location_details: formData.location_details,
        date: formData.date,
        type: formData.type.toLowerCase(),
        status: "active",
        image_url: formData.imagePreview || "",
      };

      const token = getToken();

      console.log("Submitting report to:", `${apiBaseUrl}/items`);
      console.log("Token exists:", Boolean(token));

      const response = await fetch(`${apiBaseUrl}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Submit failed response:", response.status, errorText);
        throw new Error(errorText || `Failed to submit report (${response.status})`);
      }

      navigate("/");
    } catch (error) {
      console.error("Report submission failed:", error);
      alert(error.message || "Failed to submit report.");
    }
  };

  return (
    <div className="report-page">
      <div className="report-page-header">
        <h1>Report Item</h1>
        <button
          type="button"
          className="report-back-button"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      <form className="report-form" onSubmit={handleSubmit}>
        <div className="report-form-group">
          <label>Item Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="report-form-group">
          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="report-form-row">
          <div className="report-form-group">
            <label>Category</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
            >
              <option value="3">Accessories</option>
              <option value="1">Electronics</option>
              <option value="7">Bags</option>
            </select>
          </div>

          <div className="report-form-group">
            <label>Listing Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>
        </div>

        <div className="report-form-row">
          <div className="report-form-group">
            <label>Location</label>
            <input
              type="text"
              name="location_details"
              value={formData.location_details}
              onChange={handleChange}
              required
            />
          </div>

          <div className="report-form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="report-form-group">
          <label>Item Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />

          {formData.imagePreview && (
            <div className="report-image-preview">
              <img
                src={formData.imagePreview}
                alt="Item preview"
                className="report-image-preview-img"
              />
            </div>
          )}
        </div>

        <div className="report-form-actions">
          <button type="submit" className="report-submit-button">
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}