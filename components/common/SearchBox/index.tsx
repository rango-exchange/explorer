import SearchInput from './SearchInput';

function SearchBox() {
  return (
    <div className="container flex flex-col items-center my-[100px]">
      <h1 className="w-full text-56 text-center text-baseForeground ">
        Rango Swaps Explorer
      </h1>
      <p className="w-full text-22 mb-[45px] text-neutral-200 text-center">
        Track all transactions on Rango Exchange
      </p>
      <SearchInput />
    </div>
  );
}

export default SearchBox;
