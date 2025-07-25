import { AssetType, ExplorerUrlsType, StepType, SwapStatus } from 'src/types';

export interface PropsType {
  id: string;
}

export interface SwapStepItemProps {
  step: StepType;
  firstStep?: boolean;
  lastStep?: boolean;
}

export interface SwapStepChainLogoProps {
  token: AssetType;
  refundedToken?: AssetType;
  firstStep?: boolean;
}

export interface SwapStepItemExpandedProps {
  step: StepType;
  open: boolean;
  firstStep?: boolean;
}

export interface TransactionURLProps {
  status: SwapStatus;
  explorerUrls: ExplorerUrlsType[];
}

export interface TransactionURLItemProps {
  url: string;
  description: string;
  transactionStatus: SwapStatus;
}

export interface ColumnType {
  id: number;
  title: string;
  component?: React.ComponentType<SwapStepItemValueProps>;
}

export interface SwapStepItemValueProps {
  step: StepType;
  column: ColumnType;
  firstStep?: boolean;
}
