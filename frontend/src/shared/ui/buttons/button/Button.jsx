import styles from "./Button.module.css";

const Button = ({ children, onClick, disabled, className, type }) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
