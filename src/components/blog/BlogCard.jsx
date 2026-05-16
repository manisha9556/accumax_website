import Link from "next/link";
import styles from "./Blog.module.css";

export default function BlogCard({ blog }) {

  return (

    <Link href={`/blogs/${blog._id}`} className={styles.card} style={{ textDecoration: 'none' }}>

      <img
        src={blog.images?.[0] || "/no-image.png"}
        alt={blog.title}
        className={styles.cardImg}
      />

      <div className={styles.cardBody}>

        <span className={styles.category}>
          {blog.category?.name || "BLOG"}
        </span>

        <h2 className={styles.cardTitle}>
          {blog.title}
        </h2>

        <p className={styles.cardDesc}>
          {blog.description?.slice(0, 120)}...
        </p>

        <span className={styles.readBtn}>
          Read More
        </span>

      </div>

    </Link>
  );
}