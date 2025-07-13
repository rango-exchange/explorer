/* eslint-disable @typescript-eslint/no-explicit-any */
import { SankeyProps } from './SankeyChartBox.type';
import { useEffect, useId } from 'react';
import { Chart, registerables } from 'chart.js';
import { SankeyController, Flow } from 'chartjs-chart-sankey';
import {
  DEFAULT_BLOCKCHAIN_COLOR,
  SPLIT_SOURCE_DESTINATION,
} from './SankeyChartBox.helper';
import { compactNumberFormat } from 'src/utils/amountConverter';

Chart.register(SankeyController, Flow, ...registerables);

function SankeyChart(props: SankeyProps) {
  const chartId = useId();
  const { data, labels, priority, blockchainDataMap, blockchainColorMap } =
    props;
  const getColor = (key: string) => {
    const blockchainName = key.split(SPLIT_SOURCE_DESTINATION)?.[0];

    const blockchainColor =
      blockchainColorMap.get(blockchainName) || DEFAULT_BLOCKCHAIN_COLOR;
    return blockchainColor;
  };

  useEffect(() => {
    const ctx = document.getElementById(chartId) as HTMLCanvasElement;

    const chart = new Chart(ctx, {
      type: 'sankey',
      data: {
        datasets: [
          {
            data,
            colorMode: 'gradient',
            labels,
            priority,
            colorFrom: (c) => getColor(c.dataset.data[c.dataIndex].from),
            colorTo: (c) => getColor(c.dataset.data[c.dataIndex].to),
            color: '#010101',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              // This more specific font property overrides the global property
              font: {
                size: 16,
                weight: 'bolder',
                family: 'Roboto',
              },
            },
          },

          tooltip: {
            callbacks: {
              label: function (context: any) {
                const { from, to, flow } = context.raw;
                const fromBlockchain = from.split(
                  SPLIT_SOURCE_DESTINATION,
                )?.[0];
                const toBlockchain = to.split(SPLIT_SOURCE_DESTINATION)?.[0];
                const fromName =
                  blockchainDataMap.get(fromBlockchain)?.shortName ||
                  fromBlockchain;
                const toName =
                  blockchainDataMap.get(toBlockchain)?.shortName ||
                  toBlockchain;

                return `${fromName} -> ${toName} $${compactNumberFormat(flow)}`;
              },
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [chartId, data]);

  return (
    <canvas
      id={chartId}
      className="rango-statistic-sankey-chart"
      style={{ height: '100%' }}
    />
  );
}

export default SankeyChart;
