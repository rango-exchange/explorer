import { BlockchainMeta } from 'src/types/meta';

export type SelectBlockchainProps = {
  options: BlockchainMeta[];
  label: string;
  selected: string;
  className?: string;
  onSelect: (optionName: string) => void;
};
