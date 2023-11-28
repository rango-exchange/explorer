/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { ButtonProps } from './Button.types';
import { PropsWithChildren } from 'react';

export function Button(props: PropsWithChildren<ButtonProps>) {
  const handleClick = (e: any) => {
    const btn = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - (btn.offsetLeft + radius)}px`;
    circle.style.top = `${e.clientY - (btn.offsetTop + radius)}px`;
    circle.classList.add('ripple');
    const ripple = btn.getElementsByClassName('ripple')[0];

    if (ripple) {
      ripple.remove();
    }

    btn.appendChild(circle);
    if (props.onClick) props.onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`transition-all hover:bg-opacity-90 overflow-hidden relative py-3 flex items-center justify-center px-4 text-18 font-semibold md:leading-snug text-baseForeground bg-secondary-500 rounded-micro ${
        props.className || ''
      }`}>
      {props.children}
    </button>
  );
}
