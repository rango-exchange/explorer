import { ExplorerUrlsType, StepType, SwapStatus } from 'types';

export interface PropsType {
  steps: StepType[];
}

export interface SwapStepItemProps {
  step: StepType;
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

export interface ColumnType {
  id: number;
  title: string;
  component?: any;
}

export interface SwapStepItemValueProps {
  step: StepType;
  column: ColumnType;
  firstStep?: boolean;
}
