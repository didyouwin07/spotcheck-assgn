"use client"
import { FaTools } from "react-icons/fa";
import styles from "./pageStyles.module.css";

export default async function WorkInProgress({ params }) {
  const pageId = (await params).pageId

  return (
    <div className={styles.container}>
      <FaTools className={styles.icon} />
      <div className={styles.titleText}>Page Under Construction</div>
      <div className={styles.subText}>
        The page <strong>{pageId || "Unknown"}</strong> is currently being built. Stay tuned!
      </div>
    </div>
  );
}
