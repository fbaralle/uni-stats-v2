export const getCurrentUnixTimestamp = () =>
  Math.round(new Date().getTime() / 1000);

export const getCurrentMsTimestamp = () => Date.now();

export const convertUnixToMs = (unixTs) => unixTs * 1000;

export const getParsedDbData = (data) => JSON.parse(JSON.stringify(data));

export const roundDecimals = (num, dec) => parseFloat(num).toFixed(dec || 4);

const EXPIRING_PERIOD_MS = 60 * 60 * 1000; // mins * secs * ms (in an hour)

export const checkIsLastStatExpired = (lastStatMsTimestamp) => {
  return getCurrentMsTimestamp() - lastStatMsTimestamp >= EXPIRING_PERIOD_MS;
};
