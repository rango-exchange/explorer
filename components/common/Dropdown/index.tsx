import { ChevronDownIcon } from 'components/icons';
import React, { useRef, useState } from 'react';
import { DropdownProps } from './Dropdown.types';
import useClickOutside from 'hooks/useClickOutside';

export const Dropdown = (props: DropdownProps) => {
  const { items, value, onChange, placeholder } = props;
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    setOpen(false);
  });

  return (
    <div ref={dropdownRef} className="relative w-52">
      <button
        className="w-full bg-gray-100 hover:bg-blue-100 ocus:outline-none text-sm px-10 py-2.5 items-center rounded-micro"
        onClick={() => setOpen(!open)}>
        <div className="flex justify-between w-full items-center">
          <p>
            {placeholder} <span className="capitalize">{value || ''}</span>
          </p>
          <ChevronDownIcon size="10" color="black" />
        </div>
      </button>

      {open && (
        <div className="w-full mt-1 absolute z-10 rounded-micro bg-white divide-y shadow">
          <ul className="py-2 px-1 space-y-1 text-sm text-gray-700">
            {items.map((item) => (
              <li key={item.name}>
                <div className="w-full flex items-center p-2 rounded-micro hover:bg-gray-100">
                  <div
                    onClick={() => onChange(item.name)}
                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded-micro cursor-pointer">
                    {item.title}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
