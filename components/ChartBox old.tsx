import React from 'react';
import { AmountConverter } from '../utils/amountConverter';
import { SummaryType } from '../types';
import Chart from './ChartBox';

interface PropsType {
  summary: SummaryType;
}

const ChartBox: React.FC<PropsType> = ({ summary }) => {
  return (
    <div className="px-4 py-0 lg:flex lg:items-center lg:justify-center lg:bg-neutral-100 lg:mx-16 lg:rounded-xl lg:p-8">
      <div className="p-4 bg-neutral-100 lg:w-6/12 rounded-lg mb-5 lg:mb-0 lg:p-0">
        <h3 className="text-base font-bold lg:text-3xl">Swaps</h3>

        <Chart data={summary.dailyInterval} />
      </div>
      <div className="gap-5 px-4 py-6 bg-neutral-100 grid lg:gap-x-8 lg:gap-y-24 grid-cols-2 lg:w-6/12 lg:p-0 lg:grid-cols-3 rounded-lg">
        <div className="lg:justify-self-center text-center">
          <p className="text-xl lg:text-4xl font-bold">
            {AmountConverter(summary.connectedWallets)}
          </p>
          <p className="text-xs">Total Wallets Connected</p>
        </div>
        <div className="lg:justify-self-center text-center">
          <p className="text-xl lg:text-4xl truncate font-bold">
            {AmountConverter(summary.totalTxVolumeUSD)}
          </p>
          <p className="text-xs">Total Swap Volume</p>
        </div>
        <div className="lg:justify-self-center text-center">
          <p className="text-xl truncate lg:text-4xl font-bold">
            {AmountConverter(summary.totalTxCount)}
          </p>
          <p className="text-xs">Total Swap</p>
        </div>
        <div className="lg:justify-self-center text-center">
          <p className="text-xl truncate lg:text-4xl font-bold">
            {AmountConverter(summary.supportedDexes)}
          </p>
          <p className="text-xs">Supported Dexes</p>
        </div>
        <div className="lg:justify-self-center text-center">
          <p className="text-xl truncate lg:text-4xl font-bold">
            {AmountConverter(summary.supportedChains)}
          </p>
          <p className="text-xs">Supported Chain</p>
        </div>
        <div className="lg:justify-self-center text-center">
          <p className="text-xl truncate lg:text-4xl font-bold">
            {AmountConverter(summary.supportedBridges)}
          </p>
          <p className="text-xs">Supported Bridges</p>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
