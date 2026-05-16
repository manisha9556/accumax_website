import Link from "next/link";
import styles from "./Blog.module.css";

export default function BlogCard({ blog }) {

  return (

    <div className={styles.card}>

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

        <Link href={`/blogs/${blog._id}`}>

          <button className={styles.readBtn}>
            Read More
          </button>

        </Link>

      </div>

    </div>
  );
}