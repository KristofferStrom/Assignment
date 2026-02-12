import styles from "./DefinitionList.module.css";

const DefinitionList = ({ children, className }) => {
  const listClassName = className
    ? `${styles.definitionList} ${className}`
    : styles.definitionList;
  return <dl className={listClassName}>{children}</dl>;
};

export default DefinitionList;
