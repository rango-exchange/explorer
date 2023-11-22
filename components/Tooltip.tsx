interface PropsType {
  label: string;
}
const Tooltip: React.FC<PropsType> = ({ label }: { label: string }) => {
  return (
    <span className="group-hover:visible -top-10 -left-24 lg:-top-7 lg:left-0 absolute rounded-md shadow-md text-neutral-900 bg-background text-12 font-bold transition-all duration-100 p-2 text-center min-w-max invisible">
      {label}
    </span>
  );
};

export default Tooltip;
