import { BlockchainMap, BlockchainPathMap } from 'src/types';
import { BlockchainMeta } from 'src/types/meta';

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
