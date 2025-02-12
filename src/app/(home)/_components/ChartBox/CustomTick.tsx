import { CustomTickProps } from './Chart.type';

export function CustomTick(props: CustomTickProps) {
  const { formattedValue, dxValue = 0 } = props;

  return (
    <g style={{ transform: `translateX(${dxValue}px)` }}>
      <text
        fontSize={12}
        fontWeight={400}
        textAnchor="end"
        dominantBaseline="middle"
        fill="#B8B8B8">
        {formattedValue}
      </text>
    </g>
  );
}
