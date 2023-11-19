import Image from 'next/image';
import Link from 'next/link';
import { ListItemProps } from './Footer.type';

function ListItem(props: ListItemProps) {
  const { title, openInNewTab, location, icon } = props;
  return (
    <li className="item-center flex pb-2.5 text-sm font-medium	leading-[0.8rem] text-neutral-200 lg:text-sm lg:leading-5	">
      {icon && <Image src={icon} alt="icon" width={16} height={16} />}
      <Link
        target={openInNewTab ? '_blank' : '_self'}
        rel={openInNewTab ? 'noreferrer' : 'none'}
        className={icon ? 'ml-1' : ''}
        href={location}>
        {title}
      </Link>
    </li>
  );
}

export default ListItem;
