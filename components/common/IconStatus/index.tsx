import Image from 'next/image';
import { PropsType } from './IconStatus.type';
import {
  BackgroundStatus,
  SwapStatusIcon,
  TextColorStatus,
} from './IconStatus.helper';

function IconStatus(props: PropsType) {
  const { status, hasTitle } = props;
  const statusIcon = SwapStatusIcon[status];
  const backgroundColor = BackgroundStatus[status];
  const textColor = TextColorStatus[status];

  return (
    <>
      <div
        className={`${
          hasTitle ? 'mr-5' : ''
        } w-[24px] h-[24px] rounded-full flex items-center justify-center ${backgroundColor}`}>
        <Image src={statusIcon} width={24} alt="status" />
      </div>
      {hasTitle && <div className={`text-16 ${textColor}`}>{status}</div>}
    </>
  );
}

export default IconStatus;
