/* eslint-disable react/prop-types */
export function CustomTick({ formattedValue, ...tickProps }) {
  return (
    <g transform={`translate(${tickProps.x},${tickProps.y})`}>
      <text
        fontSize={12}
        fontWeight={400}
        textAnchor="end"
        dominantBaseline="middle"
        fill="#B8B8B8" // Set tick label color
      >
        {formattedValue}
      </text>
      <line
        x1={-4} // Adjust the tick line length as needed
        x2={0}
        y1={0}
        y2={0}
        stroke="#333" // Set tick line color
      />
    </g>
  );
}
