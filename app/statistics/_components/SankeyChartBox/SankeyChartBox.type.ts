import { BlockchainPathMap } from 'types';
import { BlockchainMeta } from 'types/meta';

export type PropsType = {
  blockchainDataMap: Map<string, BlockchainMeta>;
  topSourcePath: BlockchainPathMap[];
};

export type SankeyDataType = {
  from: string;
  to: string;
  flow: number;
};

export type SankeyLabelsType = {
  [key: string]: string;
};

export type SankeyPriorityType = {
  [key: string]: number;
};

export type SankeyProps = {
  data: SankeyDataType[];
  labels: SankeyLabelsType;
  priority: SankeyPriorityType;
  blockchainDataMap: Map<string, BlockchainMeta>;
  blockchainColorMap: Map<string, string>;
};
