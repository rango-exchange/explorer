import { BlockchainMap, BlockchainPathMap } from 'types';
import { BlockchainMeta } from 'types/meta';

export type TopListItemProps = {
  title: string;
  description: string;
  isVolume?: boolean;
  blockchainDataMap: Map<string, BlockchainMeta>;
} & (
  | {
      type: 'blockchain';
      topList: BlockchainMap[];
    }
  | {
      type: 'path';
      topList: BlockchainPathMap[];
    }
);
