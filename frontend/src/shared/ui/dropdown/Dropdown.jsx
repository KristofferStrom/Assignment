import styles from "./Dropdown.module.css";

const Dropdown = ({
  id,
  label,
  value,
  onChange,
  options = [],
  placeholder = "Välj...",
  disabled = false,
  name,
  error,
  className = "",
  required = false,
}) => {
  const selectId = id ?? name;

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label ? (
        <label className={styles.label} htmlFor={selectId}>
          {label}
          {required ? " *" : ""}
        </label>
      ) : null}

      <select
        id={selectId}
        name={name}
        className={styles.select}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value, e)}
        disabled={disabled}
        required={required}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${selectId}-error` : undefined}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((opt) => (
          <option
            key={String(opt.value)}
            value={opt.value}
            disabled={opt.disabled}
          >
            {opt.label}
          </option>
        ))}
      </select>

      {error ? (
        <p id={`${selectId}-error`} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default Dropdown;
