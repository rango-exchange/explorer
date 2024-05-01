export type OptionType = {
  label: string;
  value: string;
};

export type SelectProps = {
  options: OptionType[];
  label: string;
  selected: string;
  className?: string;
  onSelect: (optionName: string) => void;
};
