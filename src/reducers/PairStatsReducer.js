import { getCurrentMsTimestamp } from 'utils/dates';
import {
  parseAPRChartData,
  parseDailyStats,
  parsePairInfo,
  getAvgFilterOptions,
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
  dailyStatsUpdatedAtMs: 0,
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
  averageFilterOptions: ['24', '12', '1'],
  avgFilterSelected: '1',
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
  UPDATE_AVG_FILTER: 'UPDATE_AVG_FILTER',
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
      const filterOptions = getAvgFilterOptions(
        data.chartDateRange.selectedPeriod
      );

      return {
        ...state,
        chartDateRange: data.chartDateRange ?? { hoursFromNow: 24 },
        averageFilterOptions: filterOptions,
        avgFilterSelected: filterOptions[filterOptions.length - 1],
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
        dailyStatsUpdatedAtMs: getCurrentMsTimestamp(),
      };
    case actions.UPDATE_AVG_FILTER:
      return {
        ...state,
        avgFilterSelected: data.avgFilterSelected,
      };
    default:
      return { ...state };
  }
};

export default PairStatsReducer;
