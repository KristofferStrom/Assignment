import styles from "./DefinitionRow.module.css";

const DefinitionRow = ({ term, children, className }) => {
  const rowClassName = className ? `${styles.row} ${className}` : styles.row;

  return (
    <div className={rowClassName}>
      <dt className={styles.term}>{term}</dt>
      <dd className={styles.definition}>{children}</dd>
    </div>
  );
};

export default DefinitionRow;
