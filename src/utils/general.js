import { EXPIRING_PERIOD_MS } from 'constants/index';
import { getCurrentMsTimestamp } from './dates';

export const getParsedDbData = (data) => JSON.parse(JSON.stringify(data));

export const roundDecimals = (num, dec) => parseFloat(num).toFixed(dec || 4);

export const checkIsLastStatExpired = (lastStatMsTimestamp) => {
  return getCurrentMsTimestamp() - lastStatMsTimestamp >= EXPIRING_PERIOD_MS;
};
