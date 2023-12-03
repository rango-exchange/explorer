import { PropsType } from './IconStatus.type';
import { SwapStatusIcon, TextColorStatus } from './IconStatus.helper';

function IconStatus(props: PropsType) {
  const { status, hasTitle } = props;
  const StatusIcon = SwapStatusIcon[status];
  const textColor = TextColorStatus[status];

  return (
    <>
      <StatusIcon size="1.25rem" className={`${hasTitle ? 'mr-5' : ''}`} />
      {hasTitle && <div className={`text-16 ${textColor}`}>{status}</div>}
    </>
  );
}

export default IconStatus;
