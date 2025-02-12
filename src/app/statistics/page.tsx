import {
  getBlockchains,
  getDailySummary,
  getTopListSummary,
} from 'src/services';

import {
  DEFAULT_STATISTIC_BREAK_DOWN_FILTER,
  DEFAULT_STATISTIC_DAYS,
} from 'src/constant';
import StatisticsPageContent from './_components/StatisticsPageContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Statistics',
};

export default async function StatisticsPage() {
  const blockchainsPromise = getBlockchains();
  const dailySummaryPromise = getDailySummary({
    days: DEFAULT_STATISTIC_DAYS,
    breakDownBy: DEFAULT_STATISTIC_BREAK_DOWN_FILTER,
  });
  const topListSummaryPromise = getTopListSummary(DEFAULT_STATISTIC_DAYS);

  const [blockchains, dailySummary, initialTopListSummary] = await Promise.all([
    blockchainsPromise,
    dailySummaryPromise,
    topListSummaryPromise,
  ]);

  return (
    <StatisticsPageContent
      dailySummary={dailySummary}
      initialTopListSummary={initialTopListSummary}
      blockchains={blockchains}
    />
  );
}
