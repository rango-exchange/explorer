import dynamic from 'next/dynamic';
import { getSankeyChartData } from './SankeyChartBox.helper';
import { PropsType } from './SankeyChartBox.type';
import React from 'react';
import { barChartColors } from '../ChartBarBox/ChartBarBox.helper';

const SankeyChart = dynamic(() => import('./SankeyChart'), {
  ssr: false,
});

function SankeyChartBox(props: PropsType) {
  const { topSourcePath, blockchainDataMap } = props;

  const { data, labels, priority, topDestinations, topSources } =
    getSankeyChartData(topSourcePath, blockchainDataMap);

  // map structure for assigning colors to each blockchain.
  const blockchainColorMap = new Map<string, string>();
  const barChartColorLength = barChartColors.length;
  let colorIndex = 0;

  // first assign color to all top sources blockchain.
  topSources.forEach((sourceItem) => {
    blockchainColorMap.set(
      sourceItem,
      barChartColors[colorIndex % barChartColorLength],
    );
    colorIndex += 1;
  });

  // second assign color to all top destinations blockchain which are not included in the source list.
  topDestinations
    .filter((destinationItem) => !topSources.includes(destinationItem))
    .forEach((destinationItem) => {
      blockchainColorMap.set(
        destinationItem,
        barChartColors[colorIndex % barChartColorLength],
      );
      colorIndex += 1;
    });

  return (
    <div className="w-full bg-baseForeground px-15 py-20 md:p-35 mt-25 rounded-soft md:rounded-normal ">
      <div className="text-28 font-semibold">
        Transfer volume among top source & destination chains
      </div>
      <div className="w-full flex items-start mt-20">
        <div className="w-full h-full h-[486px] pr-20">
          <SankeyChart
            data={data}
            labels={labels}
            priority={priority}
            blockchainDataMap={blockchainDataMap}
            blockchainColorMap={blockchainColorMap}
          />
        </div>
        <div className="w-[250px] bg-surfacesBackground py-10 px-20">
          {Array.from(blockchainColorMap).map((blockchainColorItem, index) => {
            const [blockchainName, blockchainColor] = blockchainColorItem;
            const blockchain = blockchainDataMap.get(blockchainName);
            return (
              <React.Fragment key={blockchainName}>
                <div className="flex items-center justify-start py-10">
                  <span
                    style={{ backgroundColor: blockchainColor }}
                    className={`w-[10px] h-[10px] rounded-full mr-5`}></span>
                  <span className="text-14">
                    {blockchain?.shortName || blockchainName}
                  </span>
                </div>

                {index !== blockchainColorMap.size - 1 && (
                  <div className="h-[1px] w-full bg-neutral-300"></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SankeyChartBox;
