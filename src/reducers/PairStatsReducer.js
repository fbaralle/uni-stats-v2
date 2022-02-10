import {
  getPeriodFees,
  getPeriodVolume,
  getAnnualizedAprPercentNumber,
  getChangeRate,
} from 'utils/uniswap';

export const defaultPairStats = {
  isLoadingPairInfo: false,
  isLoadingPairDailyStats: false,
  selectedPair: '',
  isLoadingChart: false,
  totalLiquidityUSD: '0.0',
  dailyLiquitityChangeRate: '0.0',
  dailyVolumeUSD: '0.0',
  dailyVolumeChangeRate: '0.0',
  dalilyFeesUSD: '0.0',
  dailyFeesChangeRate: '0.0',
  dailyAnnualizedAPR: '0.0',
  dailyAnnualizedAPRChangeRate: '0.0',
  pairData: {
    id: '',
    tokenSymbols: '',
  },
  token1: {
    name: '',
    symbol: '',
    decimals: '2',
    derivedETH: '',
  },
  token0: {
    name: '',
    symbol: '',
    decimals: '2',
    derivedETH: '',
  },
  token0Price: '0.0',
  token1Price: '0.0',
  chartDateRange: {
    from: null,
    to: null,
  },
  chartDailyData: [],
  chartHourlyData: [],
};

export const actions = {
  UPDATING_PAIR_INFO: 'UPDATING_PAIR_INFO',
  UPDATE_PAIR_INFO: 'UPDATE_PAIR_INFO',
  UPDATING_PAIR_DAILY_STATS: 'UPDATING_PAIR_DAILY_STATS',
  UPDATE_PAIR_DAILY_STATS: 'UPDATE_PAIR_DAILY_STATS',
  UPDATING_CHART_STATS: 'UPDATING_CHART_STATS',
  UPDATE_CHART_STATS: 'UPDATE_CHART_STATS',
  UPDATE_CHART_DATE_RANGE: 'UPDATE_CHART_DATE_RANGE',
  UPDATE_SELECTED_PAIR: 'UPDATE_SELECTED_PAIR',
};

const parsePairInfo = (pairData) => {
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

const parseDailyStats = (dailyStats, state) => {
  const thisDay = dailyStats.slice(0, 23);
  const lastDay = dailyStats.slice(24, 47);
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
  const thisDayAPR = getAnnualizedAprPercentNumber(
    thisDayVolume,
    thisDayLiquidity
  );
  const lastDayAPR = getAnnualizedAprPercentNumber(
    lastDayVolume,
    lastDayLiquidity
  );
  const dailyAnnualizedAPRChangeRate = getChangeRate(thisDayAPR, lastDayAPR);

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

const PairStatsReducer = (state, { type, data }) => {
  switch (type) {
    case actions.UPDATE_SELECTED_PAIR:
      return {
        ...state,
        selectedPair: data.selectedPair,
      };
    case actions.UPDATING_PAIR_INFO:
      return {
        ...state,
        isLoadingPairInfo: true,
      };
    case actions.UPDATING_PAIR_DAILY_STATS:
      return {
        ...state,
        isLoadingPairDailyStats: true,
      };
    case actions.UPDATING_CHART_STATS:
      return {
        ...state,
        isLoadingChart: true,
      };
    case actions.UPDATE_CHART_DATE_RANGE:
      return {
        ...state,
        chartDateRange: {
          from: data.from,
          to: data.to,
        },
      };
    case actions.UPDATING_CHART_STATS:
      return {
        ...state,
        chartDailyData: [],
        chartHourlyData: [],
      };
    case actions.UPDATE_PAIR_INFO:
      console.log(data);
      const pairInfo = parsePairInfo(data, state);
      return {
        ...state,
        isLoadingPairInfo: false,
        ...pairInfo,
      };
    case actions.UPDATE_PAIR_DAILY_STATS:
      const dailyStats = parseDailyStats(data);
      return {
        ...state,
        isLoadingPairDailyStats: false,
        ...dailyStats,
      };
    default:
      return { ...state };
  }
};

export default PairStatsReducer;
