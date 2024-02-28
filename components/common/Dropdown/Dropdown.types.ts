export interface DropdownProps {
  items: { title: string; name: string }[];
  placeholder: string;
  onChange: (item: string) => void;
  value: string;
}
