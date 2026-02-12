import styles from "./Seat.module.css";

const Seat = ({
  seatNumber,
  isOccupied = false,
  isSelected = false,
  className,
  isShowCase = false,
  onSelected,
}) => {
  const handleClick = () => {
    if (isOccupied || isShowCase) return;
    console.log("Seat clicked:", seatNumber);
    onSelected?.(seatNumber);
  };
  let internalClassName = "";
  if (isSelected) {
    internalClassName = styles.selected;
  } else if (isOccupied) {
    internalClassName = styles.occupied;
  }

  return (
    <div
      className={`${styles.seat} ${internalClassName} ${className}`}
      onClick={handleClick}
    ></div>
  );
};

export default Seat;
