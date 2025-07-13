import { MATCH_TYPE } from 'src/constant';
import { redirect } from 'next/navigation';
import { getSearchResult } from 'src/services';
import Result from './_components/Result';
import TableLoading from 'src/components/common/Table/TableLoading';
import { Suspense } from 'react';
import NotFound from './_components/NotFound';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  return {
    title: `Address ${searchParams.query}`,
  };
}
/*
 *
 * NOTE:
 * The code has been developed with a wrong assumption here which is always the first item in the result of `getSearchResult` is the one we should detect the type of `query` with.
 * If there is more than one result, we should let the user select the one looking for.
 */
const Page = async ({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) => {
  const { query, page } = searchParams;

  if (!query) return <NotFound />;

  let result;
  if (typeof query === 'string') {
    result = await getSearchResult(query);
  }

  if (!result?.length) return <NotFound />;

  if (result[0].matchType === MATCH_TYPE.REQUESTID) {
    redirect(`/swap/${query}`);
  }

  // HOTFIX: We priotorize transaction hash. check the note on top of the function.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const matchedWithTxHash = result?.find((item: any) => {
    return item.matchType === MATCH_TYPE.TXHASH;
  });

  if (matchedWithTxHash) {
    const { requestId } = matchedWithTxHash;
    if (requestId) redirect(`/swap/${requestId}`);
  }

  return (
    <div className="w-full flex justify-center">
      <Suspense fallback={<TableLoading title="Search Results" />}>
        <Result page={Number(page || 0)} query={query as string} />
      </Suspense>
    </div>
  );
};

export default Page;
