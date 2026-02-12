import styles from "./FormGroup.module.css";

const FormGroup = ({ children, className }) => {
  return <div className={`${styles.formGroup} ${className}`}>{children}</div>;
};
export default FormGroup;
