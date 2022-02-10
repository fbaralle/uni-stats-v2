import { UNISWAP_V2_UNITARY_FEE } from 'constants';

export const getFeesNumber = (volumeUSD) =>
  Number.parseFloat(volumeUSD) * UNISWAP_V2_UNITARY_FEE;

export const getAnnualizedAprPercentNumber = (volume, reserve) => {
  const rawAPR =
    (Number.parseFloat(volume) * UNISWAP_V2_UNITARY_FEE * 365 * 100) /
    Number.parseFloat(reserve);
  return rawAPR;
};

export const formatPercent = (num) => `${parseFloat(num).toFixed(2)} %`;

export const getChangeRate = (currentStat, previousStat) => {
  const rate =
    ((parseFloat(currentStat) - parseFloat(previousStat)) * 100) /
    parseFloat(currentStat);
  return rate;
};

export const formatCurrencyUSD = (num) =>
  parseFloat(num).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

export const getPeriodVolume = (pairHourDatas) => {
  const volumeUSD = pairHourDatas.reduce((acc, data) => {
    return acc + parseFloat(data.hourlyVolumeUSD);
  }, 0);
  return volumeUSD;
};

export const getPeriodFees = (pairHourDatas) => {
  const feesUSD = getPeriodVolume(pairHourDatas) * UNISWAP_V2_UNITARY_FEE;
  return feesUSD;
};
