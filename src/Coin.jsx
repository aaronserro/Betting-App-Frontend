// Coin.jsx
const Coin = ({ style, className }) => (
  <svg
    viewBox="0 0 32 32"
    width="32"
    height="32"
    fill="gold"
    className={className}
    style={style}
  >
    <circle cx="16" cy="16" r="14" stroke="#eab308" strokeWidth="3" fill="#facc15" />
    <circle cx="16" cy="16" r="8" fill="#fde047" />
  </svg>
);

export default Coin;