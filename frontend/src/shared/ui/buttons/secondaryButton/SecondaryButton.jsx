import Button from "../button/Button";
import styles from "./SecondaryButton.module.css";

const SecondaryButton = ({
  children,
  onClick,
  disabled,
  type = "button",
  className,
}) => {
  return (
    <Button
      className={`${styles.secondaryButton} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
