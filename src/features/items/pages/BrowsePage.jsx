import PageContainer from "../../../components/ui/PageContainer";
import useItems from "../hooks/useItems";
import ItemCard from "../components/ItemCard";
import styles from "../styles/itemsDashboard.module.css";

export default function BrowsePage() {
  const { items, isLoading, error } = useItems();

  return (
    <PageContainer>
      <h1 className={styles.title}>Browse Items</h1>
      <p className={styles.subtitle}>All lost and found items reported by the community.</p>

      {isLoading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!isLoading && !error && items.length === 0 && (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>No items reported yet</p>
          <p className={styles.emptyText}>
            Be the first to report a lost or found item.
          </p>
        </div>
      )}

      <div className={styles.grid}>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} readOnly />
        ))}
      </div>
    </PageContainer>
  );
}
