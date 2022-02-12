import { HOUR_IN_MS } from 'constants/';

export const convertUnixToMs = (unixTs) => parseInt(unixTs * 1000);
export const convertMsToUnix = (msTs) => parseInt(msTs / 1000);

export const getCurrentUnixTimestamp = () =>
  Math.round(new Date().getTime() / 1000);

export const getDateUnixTimestamp = () => {
  Math.round(new Date().getTime() / 1000);
};
export const getCurrentMsTimestamp = () => Date.now();

export const filterDataUnixPeriod = ({ fromMs, toMs, data, filterProp }) => {
  const filteredData = data.filter((item) => {
    return (
      parseInt(convertUnixToMs(item[filterProp])) >= parseInt(fromMs) &&
      parseInt(convertUnixToMs(item[filterProp])) <= parseInt(toMs)
    );
  });
  return filteredData;
};

export const getMsDateInHoursFromNow = (hoursFromNow) => {
  const timestamp = getCurrentMsTimestamp() - hoursFromNow * HOUR_IN_MS;
  return parseInt(timestamp);
};

export const getUnixDateInDaysFromNow = (daysFromNow) => {
  const timestamp = getCurrentMsTimestamp() - daysFromNow * 24 * HOUR_IN_MS;
  return convertMsToUnix(timestamp);
};

export const getUnixDateInHoursFromNow = (hoursFromNow) => {
  const timestamp = getCurrentMsTimestamp() - hoursFromNow * HOUR_IN_MS;
  return convertMsToUnix(timestamp);
};
