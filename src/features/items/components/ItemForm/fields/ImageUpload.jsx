import { useRef, useState } from "react";
import styles from "../ItemForm.module.css";

export default function ImageUpload({ onChange, error, required }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);

  function applyFile(file) {
    if (!file) return;
    onChange(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleFileChange(e) {
    applyFile(e.target.files[0] || null);
  }

  function handleRemove() {
    onChange(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    applyFile(e.dataTransfer.files[0] || null);
  }

  return (
    <div className={styles.imageField}>
      <label className={styles.label}>
        Image {required ? <span className={styles.required}>*</span> : <span className={styles.optional}>(Optional)</span>}
      </label>

      {preview ? (
        <div className={styles.previewWrapper}>
          <img src={preview} alt="Preview" className={styles.previewImg} />
          <button type="button" className={styles.removeBtn} onClick={handleRemove} title="Remove image">
            &times;
          </button>
        </div>
      ) : (
        <div
          className={`${styles.uploadZone} ${dragging ? styles.uploadZoneDragging : ""}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p className={styles.uploadZoneText}>Click to upload or drag and drop</p>
          <p className={styles.uploadZoneHint}>JPEG, PNG, GIF, WEBP</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {error && <span className={styles.fieldError}>{error}</span>}
    </div>
  );
}
