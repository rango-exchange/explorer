import { SelectProps } from './Select.types';
import { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'components/icons';

export function Select(props: SelectProps) {
  const { className, label, options, selected, onSelect } = props;

  const [open, setOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(
    (optionItem) => optionItem.value === selected,
  );

  const handleCloseOptions = () => {
    setOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      handleCloseOptions();
    }
  };

  const handleSelect = (optionName: string) => {
    onSelect(optionName);
    handleCloseOptions();
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className={`relative ${className || ''}`}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-soft w-[200px] h-[32px] bg-neutral-300 py-5 px-10 hover:bg-hoverBackground">
        <div className="w-full flex  items-center justify-between">
          <div className="flex items-center text-12">
            {selectedOption ? selectedOption.label : label}
          </div>
          {open ? (
            <ChevronUpIcon size="10px" />
          ) : (
            <ChevronDownIcon size="10px" />
          )}
        </div>
      </button>

      {open && (
        <div
          className="w-[170px] h-[256px] absolute top-[35px] z-10 rounded-soft overflow-y-scroll p-5 bg-baseForeground"
          style={{
            boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.10)',
          }}>
          {options.map((option) => (
            <button
              key={option.value}
              className="w-full flex items-center justify-start rounded-micro px-[2px] py-5 mb-10 hover:bg-hoverBackground"
              type="button"
              onClick={() => handleSelect(option.value)}>
              <input
                className="w-[16px] h-[16px] relative mr-5"
                type="radio"
                checked={
                  selectedOption && selectedOption.value === option.value
                }
              />
              <div className="text-14">{option.label}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
