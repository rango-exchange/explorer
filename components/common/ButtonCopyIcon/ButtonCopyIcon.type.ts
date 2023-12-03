import type { HTMLAttributes } from 'react';

type ButtonOnclick = Pick<HTMLAttributes<HTMLButtonElement>, 'onClick'>;

export type PropsType = ButtonOnclick & {
  text: string;
  className?: string;
  hasTooltip?: boolean;
};
