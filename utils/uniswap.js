const UNITARY_FEE = 0.003;

const fees =
  oneDayVolumeUSD || oneDayVolumeUSD === 0
    ? usingUtVolume
      ? formattedNum(oneDayVolumeUntracked * UNITARY_FEE, true)
      : formattedNum(oneDayVolumeUSD * UNITARY_FEE, true)
    : '-';

const getAnnualizedAprPercent = (volume, reserve) => {
  const rawAPR =
    (Number.parseFloat(volume) * UNITARY_FEE * 365 * 100) /
    Number.parseFloat(reserve);
  return `${rawAPR.toFixed(2)} %`;
};
