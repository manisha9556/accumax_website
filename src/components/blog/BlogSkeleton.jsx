import styles from './Blog.module.css';

export default function BlogSkeleton() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonContent}>
        <div className={`${styles.skeletonLine} ${styles.short}`}></div>
        <div className={`${styles.skeletonLine} ${styles.title}`}></div>
        <div className={styles.skeletonLine}></div>
        <div className={styles.skeletonLine}></div>
        <div className={styles.skeletonBtn}></div>
      </div>
    </div>
  );
}
