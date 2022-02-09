const UNITARY_FEE = 0.003;

export const getFeesNumber = (volumeUSD) =>
  Number.parseFloat(volumeUSD) * UNITARY_FEE;

// const fees =
//   oneDayVolumeUSD || oneDayVolumeUSD === 0
//     ? usingUtVolume
//       ? formattedNum(oneDayVolumeUntracked * UNITARY_FEE, true)
//       : formattedNum(oneDayVolumeUSD * UNITARY_FEE, true)
//     : '-';

export const getAnnualizedAprPercentNumber = (volume, reserve) => {
  const rawAPR =
    (Number.parseFloat(volume) * UNITARY_FEE * 365 * 100) /
    Number.parseFloat(reserve);
  return rawAPR;
};
