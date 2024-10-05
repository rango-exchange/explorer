import Link from 'next/link';
import { MenuProps } from './Header';

function Menu(props: MenuProps) {
  const { subMenu, showSubMenu, title, theme } = props;
  return (
    <div className="relative">
      <div className="cursor-pointer flex items-center">
        <span className="mr-2">{title}</span>
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentcolor"
            fillRule="evenodd"
            d="M10.569 2.942a.279.279 0 0 0-.395 0L5.65 7.466 1.127 2.942a.279.279 0 1 0-.395.395l4.721 4.72a.279.279 0 0 0 .395 0l4.72-4.72a.279.279 0 0 0 0-.395Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {showSubMenu && (
        <ul
          className={`${
            theme === 'dark' ? 'bg-surfacesBackground' : 'bg-neutral-500'
          }  p-4 rounded-md absolute right-0 top-8`}>
          {subMenu.map((item, index) => {
            const { icon: Icon } = item;
            return (
              <li
                className={`text-18 ${
                  theme === 'dark' ? 'text-primary-500' : 'text-baseForeground'
                } min-w-[9.625rem] whitespace-nowrap ${
                  index !== 0 ? 'pt-6' : ''
                }`}
                key={index}>
                <Link
                  target={item.openInNewTab ? '_blank' : '_self'}
                  rel={item.openInNewTab ? 'noreferrer' : 'none'}
                  className="flex items-center hover:text-secondary-500"
                  href={item.location}>
                  <Icon size="1.12rem" className="text-secondary-500" />
                  <span className="pl-1.5 text-14 font-normal">
                    {item.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Menu;
