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

  if (result[0].matchType === MATCH_TYPE.TXHASH) {
    const { requestId } = result[0];
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
