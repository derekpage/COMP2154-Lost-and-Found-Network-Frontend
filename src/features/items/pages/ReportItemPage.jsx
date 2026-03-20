import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ItemForm from "../components/ItemForm/ItemForm";
import useItemForm from "../hooks/useItemForm";
import { createItem } from "../api/itemsApi";
import { useAuth } from "../../../context/useAuth";

const CONFIG = {
  lost: {
    heading: "Report Lost Item",
    dateLabel: "Date Lost",
    imageRequired: false,
    successText: "Your lost item report has been submitted successfully. We'll notify you if someone reports finding it.",
    successViewLabel: "View Lost Items",
    reportAnotherPath: "/items/report-lost",
    reportAnotherLabel: "Report Another Lost Item",
  },
  found: {
    heading: "Report Found Item",
    dateLabel: "Date Found",
    imageRequired: true,
    successText: "Your found item report has been submitted successfully. We'll notify you if the owner comes forward.",
    successViewLabel: "View Found Items",
    reportAnotherPath: "/items/report-found",
    reportAnotherLabel: "Report Another Found Item",
  },
};

export default function ReportItemPage({ type }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);

  const config = CONFIG[type];

  async function handleFormSubmit(values) {
    await createItem({ ...values, type: type.toUpperCase(), user_id: user.id });
    setSubmitted(true);
  }

  const { values, errors, formError, submitting, onFieldChange, handleSubmit } =
    useItemForm(handleFormSubmit, { imageRequired: config.imageRequired });

  if (submitted) {
    return (
      <div style={styles.page}>
        <div style={styles.successCard}>
          <div style={styles.checkCircle}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <h1 style={styles.successTitle}>Submission Successful!</h1>
          <p style={styles.successText}>{config.successText}</p>

          <div style={styles.successActions}>
            <Link to="/browse" style={styles.primaryBtn}>
              {config.successViewLabel}
            </Link>
            <Link
              to={config.reportAnotherPath}
              style={styles.outlineBtn}
              onClick={(e) => {
                e.preventDefault();
                setSubmitted(false);
              }}
            >
              {config.reportAnotherLabel}
            </Link>
            <Link to="/profile" style={styles.outlineBtn}>
              Go to Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const accentColor = type === "lost" ? "#dc2626" : "#16a34a";
  const accentBg = type === "lost" ? "#fef2f2" : "#f0fdf4";
  const subtitle = type === "lost"
    ? "Describe the item and where you last saw it so others can help return it."
    : "Provide details about what you found so the owner can identify and claim it.";

  return (
    <div style={styles.page}>
      <div style={styles.heading}>
        <h1 style={styles.headingTitle}>{config.heading}</h1>
        <p style={styles.headingSubtitle}>{subtitle}</p>
      </div>
      <div style={{ ...styles.card, borderTop: `4px solid ${accentColor}` }}>
        <div style={{ ...styles.typeBadge, background: accentBg, color: accentColor }}>
          {type === "lost" ? "Lost Item Report" : "Found Item Report"}
        </div>
        <ItemForm
          values={values}
          errors={errors}
          formError={formError}
          submitting={submitting}
          onFieldChange={onFieldChange}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/items")}
          dateLabel={config.dateLabel}
          imageRequired={config.imageRequired}
        />
      </div>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: 680,
    margin: "0 auto",
    padding: "32px 16px",
  },
  heading: {
    marginBottom: 20,
  },
  headingTitle: {
    fontSize: 28,
    fontWeight: 800,
    marginTop: 0,
    marginBottom: 6,
    color: "#111827",
  },
  headingSubtitle: {
    margin: 0,
    color: "#6b7280",
    fontSize: 15,
    lineHeight: 1.5,
  },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: "28px 28px",
    boxShadow: "0 4px 16px rgba(15, 23, 42, 0.06)",
  },
  typeBadge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 20,
  },
  successCard: {
    background: "#fff",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    padding: "48px 24px",
    textAlign: "center",
    marginTop: 32,
  },
  checkCircle: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    border: "3px solid #16a34a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 800,
    margin: "0 0 12px",
  },
  successText: {
    color: "#6b7280",
    fontSize: 15,
    margin: "0 0 28px",
    lineHeight: 1.5,
  },
  successActions: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    display: "inline-block",
    padding: "10px 20px",
    background: "#2563eb",
    color: "white",
    borderRadius: 6,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
  },
  outlineBtn: {
    display: "inline-block",
    padding: "10px 20px",
    background: "white",
    color: "#374151",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
  },
};
