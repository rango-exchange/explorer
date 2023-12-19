import { PropsType } from './IconStatus.type';
import { StatusInfo } from './IconStatus.helper';

function IconStatus(props: PropsType) {
  const { status, hasTitle } = props;
  const statusInfo = StatusInfo[status];
  const { color, icon: StatusIcon, title } = statusInfo;

  return (
    <>
      <StatusIcon
        size="1.25rem"
        className={`${title === 'Running' ? 'animate-spin' : ''} ${
          hasTitle ? 'mr-5' : ''
        }`}
      />
      {hasTitle && <div className={`text-14 md:text-16 ${color}`}>{title}</div>}
    </>
  );
}

export default IconStatus;
