import type { PropTypes } from './Skeleton.types';

export function Skeleton(props: PropTypes) {
  const { height, width, variant = 'rectangular', className = '' } = props;
  return (
    <div
      style={{
        background:
          'linear-gradient(90deg, #C8E2FF 0%, rgba(200, 226, 255, 0.20) 70%, #C8E2FF 100%)',
        backgroundSize: '800px 100px',
        ...(width && { width: `${width}px` }),
        ...(height && { height: `${height}px` }),
      }}
      className={`animate-wave  ${
        variant === 'rectangular' ? 'rounded-soft' : 'rounded-full'
      } ${className} `}></div>
  );
}
