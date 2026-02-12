import styles from "./Highlight.module.css";

const Highlight = ({ children, className }) => {
  return <div className={`${styles.highlight} ${className}`}>{children}</div>;
};

export default Highlight;
