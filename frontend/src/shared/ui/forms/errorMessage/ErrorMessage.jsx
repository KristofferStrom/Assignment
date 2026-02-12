import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ children, className }) => {
  return <p className={`${styles.errorMessage} ${className || ""}`}>{children}</p>;
};
export default ErrorMessage;
