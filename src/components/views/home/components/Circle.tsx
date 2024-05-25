interface CircleProps {
  percentage: number;
  color?: string;
}

const Circle: React.FC<CircleProps> = ({
  percentage,
  color = "currentColor",
}) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="white"
        strokeWidth="10"
        fill="transparent"
      />
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke={color}
        strokeWidth="10"
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
      >
        <animate
          attributeName="stroke-dashoffset"
          begin="0s"
          dur="500ms"
          to={strokeDashoffset}
          fill="freeze"
        />
      </circle>
      <text x="60" y="60" textAnchor="middle" dy=".3em" fontSize="20">
        {percentage}%
      </text>
    </svg>
  );
};

export default Circle;
