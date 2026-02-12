import styles from "./Form.module.css";

const Form = ({ children, className, onSubmit, title }) => {
  return (
    <form
      className={`${styles.form} ${className}`}
      onSubmit={onSubmit}
      noValidate
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
    </form>
  );
};
export default Form;
