import styles from "../styles/claimSubmitPage.module.css";

export default function ClaimForm({
  value,
  onChange,
  error,
  imagePreview,
  onImageChange,
  onSubmit,
  onCancel,
  isSubmitting,
}) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.field}>
        <label className={styles.label}>Verification Details</label>
        <p className={styles.hint}>
          Describe how you know this item is yours — unique features, contents, markings, etc.
        </p>
        <textarea
          className={styles.textarea}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. My phone has a cracked screen and a blue case with a sticker on the back..."
          rows={6}
        />
        {error && <p className={styles.fieldError}>{error}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Evidence Image <span className={styles.optional}>(optional)</span></label>
        <p className={styles.hint}>
          Attach a photo as proof of ownership, e.g. a photo of you with the item.
        </p>

        {imagePreview ? (
          <img src={imagePreview} alt="Evidence preview" className={styles.previewImage} />
        ) : (
          <div className={styles.noImage}>No image selected</div>
        )}

        <input
          className={styles.fileInput}
          type="file"
          accept="image/*"
          onChange={onImageChange}
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.submitBtn} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Claim"}
        </button>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
