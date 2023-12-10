import SearchInput from './SearchInput';

function SearchBox() {
  return (
    <div className="container px-25 md:px-0 flex flex-col items-center my-35 md:my-[100px]">
      <h1 className="w-full font-semibold md:text-56 text-28 text-center text-baseForeground ">
        Rango Swaps Explorer
      </h1>
      <p className="w-full mt-10 md:mt-0 md:text-22 text-16 mb-[45px] text-neutral-200 text-center">
        Track all transactions on Rango Exchange
      </p>
      <SearchInput />
    </div>
  );
}

export default SearchBox;
