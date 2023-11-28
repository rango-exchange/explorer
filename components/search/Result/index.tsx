import Table from 'components/common/Table';
import { PropsType } from './Result.type';

function Result(props: PropsType) {
  const { data } = props;
  return (
    <div className="container mt-[3.125rem] rounded-normal bg-baseForeground p-35">
      <div className="flex flex-col">
        <div className="flex flex-col justify-center">
          <h2 className="text-28 font-semibold text-primary-500">
            Search Results
          </h2>
          <p className="text-16 text-neutral-800">
            {`Found ${data.length} Rango swaps for this wallet address`}
          </p>
        </div>
        <div className="mt-25">
          <Table data={data} />
        </div>
      </div>
    </div>
  );
}

export default Result;
