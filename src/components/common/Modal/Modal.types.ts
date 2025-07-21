export interface PropTypes {
  open: boolean;
  onClose: () => void;
  dismissible?: boolean;
  title: string;
  prefix?: React.ReactNode;
}
