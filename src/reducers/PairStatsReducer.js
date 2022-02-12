import {
  parseAPRChartData,
  parseDailyStats,
  parsePairInfo,
} from './parse-utils';

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
    selectedPeriod: 'day',
    hoursFromNow: 24,
  },
  chartAverageHours: 1,
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
        chartDateRange: data.chartDateRange ?? { hoursFromNow: 24 },
      };
    case actions.UPDATE_CHART_STATS:
      return {
        ...state,
        isLoadingChart: false,
        chartDailyData: [],
        chartHourlyData: parseAPRChartData(data.chartData, data.snapshotPeriod),
      };
    case actions.UPDATE_PAIR_INFO:
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
