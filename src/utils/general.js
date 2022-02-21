import { EXPIRING_PERIOD_MS } from 'constants/index';
import { getCurrentMsTimestamp } from './dates';

export const getParsedDbData = (data) => JSON.parse(JSON.stringify(data));

export const roundDecimals = (num, dec) => parseFloat(num).toFixed(dec || 4);

export const checkIsLastStatExpired = (lastStatMsTimestamp) => {
  return getCurrentMsTimestamp() - lastStatMsTimestamp >= EXPIRING_PERIOD_MS;
};

export const getAverage = (data) => {
  const average = data.reduce((acc, el) => {
    return acc + el.data / data.length;
  }, 0);
  return average;
};

export const groupDataByHoursFilter = (data, filterInHours) => {
  const slices = Math.floor(data.length / filterInHours);
  const groupedData = new Array(slices).fill([]).map((el, i) => {
    const startIndex = i * filterInHours;
    const cutIndex = filterInHours * (i + 1);
    return data.slice(startIndex, cutIndex);
  });
  return groupedData;
};

export const getAverageStatsByFilter = (data, filterInHours) => {
  const averagedData = groupDataByHoursFilter(
    data,
    parseInt(filterInHours)
  ).map((groupedStats) => {
    return { label: groupedStats[0].label, data: getAverage(groupedStats) };
  });
  return averagedData;
};
