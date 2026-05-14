import Link from "next/link";
import styles from "./dropdown.module.css";

const DropdownItem = ({ item }) => {
  return (
    <li className={styles.item}>
      {item.children ? (
        <>
          <span className={styles.itemLabel}>
            {item.title} ▶
          </span>

          <ul className={styles.submenu}>
            {item.children.map((child, index) => (
              <DropdownItem key={index} item={child} />
            ))}
          </ul>
        </>
      ) : (
        <Link href={item.href} className={styles.link}>
          {item.title}
        </Link>
      )}
    </li>
  );
};

export default DropdownItem;