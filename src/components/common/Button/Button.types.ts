import type { HTMLAttributes } from 'react';

type ButtonOnclick = Pick<HTMLAttributes<HTMLButtonElement>, 'onClick'>;

export type ButtonProps = ButtonOnclick & {
  className?: string;
  disabled?: boolean;
};

export interface LinkButtonProps {
  href: string;
  className?: string;
}
