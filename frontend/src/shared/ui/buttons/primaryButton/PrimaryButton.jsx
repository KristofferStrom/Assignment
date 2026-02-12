import styles from "./PrimaryButton.module.css";
import Button from "../button/Button";
const PrimaryButton = ({ children, onClick, disabled, type = "button", className }) => {
  return (
    <Button
      className={`${styles.primaryButton} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
