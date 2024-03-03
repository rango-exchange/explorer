import { useId } from 'react';
import Link from 'next/link';
import { Skeleton } from 'components/common/Skeleton';
import TableHead from 'components/common/Table/TableHead';

function Loading() {
  return (
    <div className="w-[calc(100%-3.125rem)] md:container mt-30  md:mt-[3.125rem] rounded-normal bg-baseForeground  px-15 py-20 md:p-35 overflow-hidden">
      <div className="flex flex-col">
        <div className="flex flex-col h-20">
          <h2 className="text-14 md:text-28 font-semibold text-primary-500">
            Transactions Results
          </h2>
          <div className="text-12 md:text-16 text-neutral-800">
            <Skeleton width={300} height={24} />
          </div>
        </div>
        <div className="md:mt-25">
          <div className="w-full">
            <TableHead />
            <div className="w-full">
              {Array.from({ length: 14 }, () => {
                const id = useId();
                return (
                  <div
                    key={id}
                    className={`flex flex-col p-15 mt-15  md:mt-0 md:p-0 rounded-micro md:-rounded-none md:grid bg-surfacesBackground md:bg-transparent md:hover:bg-hoverBackground md:border-b md:border-neutral-300 md:even:bg-surfacesBackground md:grid-cols-11 w-full`}>
                    <div
                      className={`flex flex-col md:py-[27px] md:px-15 lg:px-20 col-span-3`}>
                      <div className="text-12 md:hidden text-primary-500">
                        Request ID
                      </div>
                      <Skeleton
                        className="mt-5 md:mt-0 w-[220px] md:w-[178px]"
                        height={15}
                      />
                      <Skeleton className="mt-5" width={169} height={10} />
                    </div>
                    <div className="flex items-center mt-15 md:mt-0 md:py-[27px] md:px-15 lg:px-20 col-span-2">
                      <div className="relative">
                        <Skeleton
                          className="w-[27px] md:w-[30px] h-[27px] md:h-[30px]"
                          variant="circular"
                        />
                        <Skeleton
                          className="absolute w-[12px] md:w-[15px] h-[12px] md:h-[15px] right-[-2px] bottom-[-2px] md:right-[-3px] md:bottom-[-3px]"
                          variant="circular"
                        />
                      </div>
                      <div className="flex flex-col ml-5 justify-center">
                        <Skeleton width={92} height={15} />
                        <Skeleton
                          className="mt-[2px] md:mt-5"
                          width={60}
                          height={10}
                        />
                      </div>
                    </div>
                    <div className="md:hidden ml-[0.875rem] h-[15px] border-l border-neutral-400"></div>
                    <div className="flex items-center md:py-[27px] md:px-15 lg:px-20 col-span-2">
                      <div className="relative">
                        <Skeleton
                          className="w-[27px] md:w-[30px] h-[27px] md:h-[30px]"
                          variant="circular"
                        />
                        <Skeleton
                          className="absolute w-[12px] md:w-[15px] h-[12px] md:h-[15px] right-[-2px] bottom-[-2px] md:right-[-3px] md:bottom-[-3px]"
                          variant="circular"
                        />
                      </div>
                      <div className="flex flex-col ml-5 justify-center">
                        <Skeleton width={92} height={15} />
                        <Skeleton
                          className="mt-[2px] md:mt-5"
                          width={60}
                          height={10}
                        />
                      </div>
                    </div>
                    <div
                      className={`flex flex-col md:py-[27px] mt-15 md:mt-0  md:px-15 lg:px-20 col-span-2`}>
                      <div className="text-12 md:hidden text-primary-500">
                        Amount
                      </div>
                      <Skeleton
                        className="mt-5 md:mt-0 w-[114px] md:w-[145px]"
                        height={15}
                      />
                      <Skeleton
                        className="mt-5 w-[86px] md:w-[108px]"
                        height={10}
                      />
                    </div>
                    <div
                      className={`flex flex-col mt-25 md:mt-0 md:py-[27px] md:px-15 lg:px-20 col-span-2`}>
                      <div className="text-12 md:hidden text-primary-500">
                        Status
                      </div>
                      <Skeleton
                        className="mt-5 md:mt-0 w-[114px] md:w-[108px]"
                        height={15}
                      />
                      <Skeleton
                        className="mt-5 w-[86px] md:w-[70px]"
                        height={10}
                      />
                    </div>
                    <Link
                      href="#"
                      className={`w-full md:hidden text-center rounded-micro mt-30 border border-primary-600 py-10 text-primary-600 text-16 font-semibold`}>
                      Detail
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-15 md:mt-25">
          <div className="flex items-center justify-center">
            <Skeleton className="rounded-micro w-[2.25rem] md:w-[2.5rem] h-[2.25rem] md:h-[2.5rem]" />
            <Skeleton className="mx-5 md:mx-10 rounded-micro w-[2.25rem] md:w-[2.5rem] h-[2.25rem] md:h-[2.5rem]" />

            <Skeleton className="w-[5.375rem] h-[2.25rem]  md:w-[7.125rem] md:h-[2.5rem] rounded-micro" />

            <Skeleton className="mx-5 md:mx-10 rounded-micro w-[2.25rem] md:w-[2.5rem] h-[2.25rem] md:h-[2.5rem]" />
            <Skeleton className="rounded-micro w-[2.25rem] md:w-[2.5rem] h-[2.25rem] md:h-[2.5rem]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
