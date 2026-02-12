import styles from "./Label.module.css";

const Label = ({ text, htmlFor, required }) => {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {text}{required && " *"}
    </label>
  );
};
export default Label;
