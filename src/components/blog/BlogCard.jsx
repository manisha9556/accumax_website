import Link from 'next/link';
import Image from 'next/image';
import styles from './Blog.module.css';

export default function BlogCard({ blog }) {
  const { _id, title, category, description, status, images } = blog;
  const imageSrc = images && images.length > 0 ? images[0] : '/placeholder.jpg';
  const categoryName = category?.name || 'Uncategorized';
  
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {/* We use standard img to avoid Next.js image domain config errors for external/upload urls */}
        <img src={imageSrc} alt={title} className={styles.image} />
        {/* <span className={`${styles.statusBadge} ${status === 'Active' ? styles.statusActive : styles.statusInactive}`}>
          {status}
        </span> */}
      </div>
      <div className={styles.cardContent}>
        <span className={styles.category}>{categoryName}</span>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.description}>
          {description?.length > 100 ? `${description.slice(0, 100)}...` : description}
        </p>
        <Link href={`/blogs/${blog._id}`} className={styles.readMoreBtn}>
          Read More
        </Link>
      </div>
    </div>
  );
}
