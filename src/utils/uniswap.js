const UNITARY_FEE = 0.003;

export const getFeesNumber = (volumeUSD) =>
  Number.parseFloat(volumeUSD) * UNITARY_FEE;

export const getAnnualizedAprPercentNumber = (volume, reserve) => {
  const rawAPR =
    (Number.parseFloat(volume) * UNITARY_FEE * 365 * 100) /
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
  const feesUSD = getPeriodVolume(pairHourDatas) * UNITARY_FEE;
  return feesUSD;
};
