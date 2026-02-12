import styles from "./DatePicker.module.css";

const DatePicker = ({
  id,
  name,
  label,
  value,
  onChange,
  min,
  max,
  disabled = false,
  error,
  required = false,
  className = "",
  type = "datetime-local",
}) => {
  const inputId = id ?? name;

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label ? (
        <label className={styles.label} htmlFor={inputId}>
          {label}
          {required ? " *" : ""}
        </label>
      ) : null}

      <input
        id={inputId}
        name={name}
        className={styles.input}
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value, e)}
        min={min}
        max={max}
        disabled={disabled}
        required={required}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />

      {error ? (
        <p id={`${inputId}-error`} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default DatePicker;
