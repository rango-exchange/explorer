'use client';

/* eslint-disable @typescript-eslint/restrict-plus-operands */
import Link from 'next/link';
import { LinkButtonProps } from './Button.types';
import { PropsWithChildren } from 'react';

export function LinkButton(props: PropsWithChildren<LinkButtonProps>) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
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
  };
  return (
    <Link
      onClick={onClick}
      target="_blank"
      className={`transition-all hover:bg-opacity-90 overflow-hidden  relative py-10 md:py-15 flex items-center justify-center px-20 font-medium	text-16 md:text-18  md:leading-snug md:text-18 text-baseForeground bg-secondary-500 rounded-soft ${
        props.className ? props.className : ''
      }`}
      href={props.href}>
      {props.children}
    </Link>
  );
}
