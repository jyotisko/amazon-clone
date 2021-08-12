interface SpinnerProps {
  size?: string | number;
  styles?: object;
};

const Spinner: React.FC<SpinnerProps> = ({ size = 50, styles = {} }) => {
  return (
    <svg className="spinner" style={{
      ...styles,
      height: `${size}px`,
      width: `${size}px`,
    }} viewBox="0 0 50 50">
      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
    </svg>
  );
};

export default Spinner;