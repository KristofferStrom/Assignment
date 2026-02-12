const Icon = ({ as: Svg, size = 18, className = "", ...props }) => {
  return (
    <Svg size={size} className={className} aria-hidden="true" {...props} />
  );
};

export default Icon;
