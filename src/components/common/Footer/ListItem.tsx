import Link from 'next/link';
import { ListItemProps } from './Footer.type';

function ListItem(props: ListItemProps) {
  const { title, openInNewTab, location, icon: Icon } = props;
  return (
    <li className="item-center flex pb-2.5 text-12 md:text-16 md:font-medium	leading-[0.8rem] text-neutral-200 md:text-16 md:leading-5	">
      {Icon && <Icon className="text-neutral-200" />}
      <Link
        target={openInNewTab ? '_blank' : '_self'}
        rel={openInNewTab ? 'noreferrer' : 'none'}
        className={Icon ? 'ml-1' : ''}
        href={location}>
        {title}
      </Link>
    </li>
  );
}

export default ListItem;
