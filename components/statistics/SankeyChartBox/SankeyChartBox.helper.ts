import { BlockchainPathMap } from 'types';
import {
  SankeyDataType,
  SankeyLabelsType,
  SankeyPriorityType,
} from './SankeyChartBox.type';
import { BlockchainMeta } from 'types/meta';

const MAX_NUMBER_OF_SOURCE = 10;
const MAX_NUMBER_OF_DESTINATION = 10;
export const DEFAULT_BLOCKCHAIN_COLOR = '#B7D8FF';
export const SPLIT_SOURCE_DESTINATION = '__';

export const getSankeyChartData = (
  topPaths: BlockchainPathMap[],
  blockchainDataMap: Map<string, BlockchainMeta>,
) => {
  const sourceTotalValueMap = new Map<string, number>();
  const destinationTotalValueMap = new Map<string, number>();
  const labels: SankeyLabelsType = {};
  const priority: SankeyPriorityType = {};

  // Creating a map for the source and destination, so that we can have the total value for each blockchain.
  topPaths.forEach((topItem) => {
    const { key, value } = topItem;
    const { source, destination } = key;
    if (source) {
      const sum = sourceTotalValueMap.get(source) || 0;
      sourceTotalValueMap.set(source, sum + value);
    }

    if (destination) {
      const sum = destinationTotalValueMap.get(destination) || 0;
      destinationTotalValueMap.set(destination, sum + value);
    }
  });

  const topSources = Array.from(sourceTotalValueMap)
    .map(([source, value]) => ({
      source,
      value,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, MAX_NUMBER_OF_SOURCE)
    .map((topItem) => topItem.source);

  const topDestinations = Array.from(destinationTotalValueMap)
    .map(([destination, value]) => ({
      destination,
      value,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, MAX_NUMBER_OF_DESTINATION)
    .map((topItem) => topItem.destination);

  const topPathSorted = topPaths.sort((a, b) => b.value - a.value);

  const data: SankeyDataType[] = [];
  let priorityStep = 0;
  topSources.forEach((sourceItem) => {
    const topPathBySource = topPathSorted
      .filter(
        (pathItem) =>
          pathItem.key.source === sourceItem &&
          topDestinations.includes(pathItem.key.destination),
      )
      .slice(0, MAX_NUMBER_OF_DESTINATION);

    // add SPLIT_SOURCE_DESTINATION to the end of source key to prevent loop in chart
    const sourceKey = sourceItem + SPLIT_SOURCE_DESTINATION + 'source';
    labels[sourceKey] =
      blockchainDataMap.get(sourceItem)?.shortName || sourceItem;
    priority[sourceKey] = priorityStep;
    priorityStep += 1;

    topPathBySource.forEach((topPathItem) => {
      const { key, value } = topPathItem;
      const { destination } = key;

      // add SPLIT_SOURCE_DESTINATION to the end of destination key to prevent loop in chart
      const destinationKey =
        destination + SPLIT_SOURCE_DESTINATION + 'destination';
      labels[destinationKey] =
        blockchainDataMap.get(destination)?.shortName || destination;
      data.push({
        from: sourceKey,
        to: destinationKey,
        flow: value,
      });
    });
  });

  topDestinations.forEach((destinationItem) => {
    const destinationKey =
      destinationItem + SPLIT_SOURCE_DESTINATION + 'destination';
    priority[destinationKey] = priorityStep;
    priorityStep += 1;
  });

  return {
    data: data,
    labels,
    priority,
    topSources,
    topDestinations: topDestinations,
  };
};
