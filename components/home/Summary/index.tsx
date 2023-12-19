import React from 'react';
import { SummaryProps } from './Summary.type';
import SummaryItem from './SummaryItem';

function Summary(props: SummaryProps) {
  const { summary } = props;
  return (
    <div className="grid grid-cols-2 gap-10 pr-20 md:pr-0 md:gap-15">
      <SummaryItem value={summary.connectedWallets} title="Total Wallets" />
      <SummaryItem
        value={summary.totalTxVolumeUSD}
        title="Total Volume"
        prefix="$"
      />
      <SummaryItem value={summary.totalTxCount} title="Total Swaps" />
      <SummaryItem value={summary.supportedDexes} title="Supported DEXes" />
      <SummaryItem value={summary.supportedChains} title="Supported Chains" />
      <SummaryItem value={summary.supportedBridges} title="Supported Bridges" />
    </div>
  );
}

export default Summary;
