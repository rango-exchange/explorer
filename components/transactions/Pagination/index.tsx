import { SEARCH_RESULT_OFFSET as offsetPage } from 'constant';
import { PropsType } from './Pagination.type';
import {
  FirstPageIcon,
  LastPageIcon,
  NextPageIcon,
  PrevPageIcon,
} from 'components/icons';
import Link from 'next/link';

function Pagination(props: PropsType) {
  const { page, total } = props;
  const totalPage = Math.ceil(total / offsetPage);

  return (
    <div className="flex items-center justify-center">
      {page > 0 && totalPage > 1 ? (
        <>
          <Link
            href={`/transactions?&page=0`}
            className="flex items-center rounded-micro justify-center w-[2.25rem] md:w-[2.5rem] h-[2.25rem] md:h-[2.5rem] text-neutral-400 bg-surfacesBackground hover:text-hoverIcon hover:bg-hoverBackground cursor-pointer">
            <FirstPageIcon size="0.625rem" />
          </Link>
          <Link
            href={`/transactions?&page=${page - 1}`}
            className="flex items-center mx-5 md:mx-10 rounded-micro justify-center w-[2.25rem] md:w-[2.5rem] h-[2.25rem] md:h-[2.5rem] text-neutral-400 bg-surfacesBackground hover:text-hoverIcon hover:bg-hoverBackground cursor-pointer">
            <PrevPageIcon />
          </Link>
        </>
      ) : (
        <>
          <button className="flex items-center justify-center w-[2.25rem] md:w-[2.5rem] h-[2.25rem] md:h-[2.5rem]  text-neutral-800 bg-transparent border border-solid border-neutral-300 cursor-not-allowed">
            <FirstPageIcon size="0.625rem" />
          </button>
          <button className="flex items-center mx-5 md:mx-10 justify-center w-[2.25rem] md:w-[2.5rem] h-[2.25rem] md:h-[2.5rem] text-neutral-800 bg-transparent border border-solid border-neutral-300 cursor-not-allowed">
            <PrevPageIcon />
          </button>
        </>
      )}
      <div className="flex w-[5.375rem] h-[2.25rem]  md:w-[7.125rem] md:h-[2.5rem] items-center justify-center px-10 py-5 rounded-micro bg-surfacesBackground text-10 md:text-12 font-medium text-neutral-800">{`Page ${
        page + 1
      } of ${totalPage}`}</div>

      {page + 1 < totalPage && totalPage > 1 ? (
        <>
          <Link
            href={`/transactions?&page=${page + 1}`}
            className="flex items-center mx-5 md:mx-10 rounded-micro justify-center w-[2.25rem] md:w-[2.5rem] h-[2.25rem] md:h-[2.5rem] text-neutral-400 bg-surfacesBackground hover:text-hoverIcon hover:bg-hoverBackground cursor-pointer">
            <NextPageIcon />
          </Link>
          <Link
            href={`/transactions?&page=${totalPage - 1}`}
            className="flex items-center rounded-micro justify-center w-[2.25rem] md:w-[2.5rem] h-[2.25rem] md:h-[2.5rem] text-neutral-400 bg-surfacesBackground hover:text-hoverIcon hover:bg-hoverBackground cursor-pointer">
            <LastPageIcon size="0.625rem" />
          </Link>
        </>
      ) : (
        <>
          <button className="flex items-center mx-5 md:mx-10 justify-center w-[2.25rem] md:w-[2.5rem] h-[2.25rem] md:h-[2.5rem] text-neutral-800 bg-transparent border border-solid border-neutral-300 cursor-not-allowed">
            <NextPageIcon />
          </button>
          <button className="flex items-center  justify-center  w-[2.25rem] md:w-[2.5rem] h-[2.25rem] md:h-[2.5rem]  text-neutral-800 bg-transparent border border-solid border-neutral-300 cursor-not-allowed">
            <LastPageIcon size="0.625rem" />
          </button>
        </>
      )}
    </div>
  );
}

export default Pagination;
