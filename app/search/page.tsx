import { MATCH_TYPE } from 'constant';
import { notFound, redirect } from 'next/navigation';
import { getSearchResult, getWalletSwaps } from 'services';
import Result from './_components/Result';

const Page = async ({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) => {
  const { query, page } = searchParams;

  if (!query) notFound();

  let result;
  if (typeof query === 'string') {
    result = await getSearchResult(query);
  }

  if (!result?.length) notFound();

  if (result[0].matchType === MATCH_TYPE.REQUESTID) {
    redirect(`/swap/${query}`);
  }

  if (result[0].matchType === MATCH_TYPE.TXHASH) {
    const { requestId } = result[0];
    if (requestId) redirect(`/swap/${requestId}`);
  }

  const data = await getWalletSwaps(query, page);
  const { transactions, total } = data || {};

  if (!data || !transactions?.length) {
    notFound();
  }

  return (
    <div className="w-full flex justify-center">
      <Result
        total={total}
        page={Number(page || 0)}
        data={transactions}
        query={query as string}
      />
    </div>
  );
};

export default Page;
