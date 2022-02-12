import {
  getCurrentMsTimestamp,
  filterDataUnixPeriod,
  getMsDateInHoursFromNow,
} from 'utils/dates';
import {
  getPeriodFees,
  getPeriodVolume,
  getDayAnnualizedAPRPercentNumber,
  getChangeRate,
  getHourAnnualizedAPRPercentNumber,
} from 'utils/uniswap';
import { defaultPairStats } from './PairStatsReducer';

export const parsePairInfo = (pairData) => {
  return {
    pairData: {
      id: pairData.id ?? '',
      tokenSymbols: `${pairData.token0.symbol ?? ''} / ${
        pairData.token1.symbol ?? ''
      }`,
    },
    token0Price: pairData.token0Price ?? '',
    token1Price: pairData.token1Price ?? '',
    token0: {
      decimals: pairData.token0.decimals
        ? parseInt(pairData.token0.decimals)
        : '',
      name: pairData.token0.name ?? '',
      symbol: pairData.token0.symbol ?? '',
      derivedETH: pairData.token0.derivedETH ?? '',
    },
    token1: {
      decimals: pairData.token1.decimals
        ? parseInt(pairData.token1.decimals)
        : '',
      name: pairData.token1.name ?? '',
      symbol: pairData.token1.symbol ?? '',
      derivedETH: pairData.token1.derivedETH ?? '',
    },
  };
};

const returnDefaultValues = (keys) => {
  return keys.reduce((acc, key) => {
    return {
      ...acc,
      [key]: defaultPairStats[key],
    };
  }, {});
};

export const parseDailyStats = (dailyStats, state) => {
  const defaultStatValues = returnDefaultValues([
    'dailyVolumeUSD',
    'dailyVolumeChangeRate',
    'dalilyFeesUSD',
    'dailyFeesChangeRate',
    'dailyAnnualizedAPR',
    'dailyAnnualizedAPRChangeRate',
    'totalLiquidityUSD',
    'dailyLiquitityChangeRate',
  ]);

  const thisDay = filterDataUnixPeriod({
    fromMs: getMsDateInHoursFromNow(24),
    toMs: getCurrentMsTimestamp(),
    filterProp: 'hourStartUnix',
    data: dailyStats,
  });
  const lastDay = filterDataUnixPeriod({
    fromMs: getMsDateInHoursFromNow(48),
    toMs: getMsDateInHoursFromNow(24),
    filterProp: 'hourStartUnix',
    data: dailyStats,
  });

  if (thisDay.length < 1) return defaultStatValues;
  if (lastDay.length < 1) return defaultStatValues;

  const thisDayVolume = getPeriodVolume(thisDay);
  const lastDayVolume = getPeriodVolume(lastDay);
  const dailyVolumeChangeRate = getChangeRate(thisDayVolume, lastDayVolume);
  const thisDayFees = getPeriodFees(thisDay);
  const lastDayFees = getPeriodFees(lastDay);
  const dailyFeesChangeRate = getChangeRate(thisDayFees, lastDayFees);
  const thisDayLiquidity = thisDay[0].reserveUSD;
  const lastDayLiquidity = lastDay[0].reserveUSD;
  console.log({ thisDayLiquidity, lastDayLiquidity });
  const dailyLiquitityChangeRate = getChangeRate(
    thisDayLiquidity,
    lastDayLiquidity
  );
  const thisDayAPR = getDayAnnualizedAPRPercentNumber(
    thisDayVolume,
    thisDayLiquidity
  );
  const lastDayAPR = getDayAnnualizedAPRPercentNumber(
    lastDayVolume,
    lastDayLiquidity
  );
  const dailyAnnualizedAPRChangeRate = getChangeRate(thisDayAPR, lastDayAPR);
  parseAPRChartData(dailyStats);
  return {
    dailyVolumeUSD: thisDayVolume,
    dailyVolumeChangeRate,
    dalilyFeesUSD: thisDayFees,
    dailyFeesChangeRate,
    dailyAnnualizedAPR: thisDayAPR,
    dailyAnnualizedAPRChangeRate,
    totalLiquidityUSD: thisDayLiquidity,
    dailyLiquitityChangeRate,
  };
};

const formatUnixToHumanDate = (unixTs) => {
  return new Date(parseInt(unixTs) * 1000).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    year: 'numeric',
  });
};

export const parseAPRChartData = (dailyStats, period) => {
  const chartHourlyData = dailyStats.map((item) => {
    const formattedDate = formatUnixToHumanDate(
      period === 'hour' ? item.hourStartUnix : item.date
    );
    return {
      label: formattedDate,
      data:
        period === 'hour'
          ? getHourAnnualizedAPRPercentNumber(
              item.hourlyVolumeUSD,
              item.reserveUSD
            )
          : getDayAnnualizedAPRPercentNumber(
              item.dailyVolumeUSD,
              item.reserveUSD
            ),
    };
  });
  return chartHourlyData;
};
