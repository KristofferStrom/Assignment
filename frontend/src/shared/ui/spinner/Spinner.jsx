import styles from "./Spinner.module.css";
const Spinner = ({ size = "md", className }) => {
  const sizeClassName =
    size === "sm" ? styles.sm : size === "lg" ? styles.lg : styles.md;

  const cn = [styles.spinner, sizeClassName, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cn} role="status" aria-busy="true">
      <span className={styles.circle} aria-hidden="true" />
    </div>
  );
};

export default Spinner;
