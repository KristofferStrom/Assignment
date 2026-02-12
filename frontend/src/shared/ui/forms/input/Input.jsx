import styles from "./Input.module.css";

const Input = ({
  type = "text",
  id,
  required = false,
  className = "",
  onChange,
  value = "",
  placeholder = "",
}) => {
  const handleChange = (value) => {
    if (type === "number") {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        onChange(numericValue);
      } else {
        onChange("");
      }
    } else {
      onChange(value);
    }
  };
  return (
    <input
      onChange={(e) => handleChange(e.target.value)}
      value={value}
      type={type}
      id={id}
      required={required}
      className={`${styles.input} ${className}`}
      placeholder={placeholder}
    />
  );
};

export default Input;
