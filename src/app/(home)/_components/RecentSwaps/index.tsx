import Table from 'src/components/common/Table';
import { getLastSwaps } from 'src/services';
import { Timer } from '../Timer';

const RecentSwaps = async () => {
  const lastSwaps = await getLastSwaps();

  return (
    <div className="w-[calc(100%-3.125rem)] md:container mt-30  md:mt-[3.125rem] rounded-normal bg-baseForeground px-15 py-20 md:p-35 overflow-hidden">
      <div className="flex flex-col">
        <div className="flex justify-between  md:mb-25 items-start">
          <div className="flex flex-col justify-center items-start">
            <h2 className="text-14 md:text-28 font-semibold text-primary-500">
              Recent Swaps
            </h2>
            <p className="text-12 md:text-16 text-neutral-800">
              Latest 25 swaps on Rango
            </p>
          </div>
          <div className="flex items-center pt-10">
            <Timer />
          </div>
        </div>
        <div>
          <Table data={lastSwaps} />
        </div>
      </div>
    </div>
  );
};

export default RecentSwaps;
