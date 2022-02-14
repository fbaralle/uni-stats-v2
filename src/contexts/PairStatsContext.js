import {
  createContext,
  useReducer,
  useRef,
  useContext,
  useEffect,
} from 'react';
import PairStatsReducer, {
  actions,
  defaultPairStats,
} from 'reducers/PairStatsReducer';
import { mockDayDatas, pairHourDatasMock } from 'server/mock-hour-stats';
import { getPairDayDatas, getPairHourDatas } from 'server/pair-stats';
import { getPairs } from 'server/pairs';

const {
  UPDATING_PAIR_INFO,
  UPDATE_PAIR_INFO,
  UPDATING_PAIR_DAILY_STATS,
  UPDATE_PAIR_DAILY_STATS,
  UPDATING_CHART_STATS,
  UPDATE_CHART_STATS,
  UPDATE_CHART_DATE_RANGE,
  UPDATE_SELECTED_PAIR,
  UPDATE_AVG_FILTER,
} = actions;

const DAY_HOURS = 24;

const getPairInfo = async ({ pair, dispatch }) => {
  dispatch({ type: UPDATING_PAIR_INFO });
  try {
    const { pairs } = await getPairs([pair]);
    const pairData = pairs.length > 0 ? pairs[0] : {};
    dispatch({ type: UPDATE_PAIR_INFO, data: pairData });
  } catch (e) {
    console.log('[ERROR] getPairInfo', e);
  }
};

const getPairDailyStats = async ({ pairAddress, dispatch }) => {
  dispatch({ type: UPDATING_PAIR_DAILY_STATS });
  try {
    const { pairHourDatas } = await getPairHourDatas({
      pairAddress,
      hoursFromNow: DAY_HOURS * 2,
    });
    dispatch({
      type: UPDATE_PAIR_DAILY_STATS,
      data: pairHourDatas,
    });
  } catch (e) {
    console.log('[ERROR] getPairInfo', e);
  }
};

const getChartStats = async ({
  pairAddress,
  hoursFromNow,
  period,
  dispatch,
}) => {
  dispatch({ type: UPDATING_CHART_STATS });
  try {
    if (period === 'day' || period === 'week') {
      const { pairHourDatas } = await getPairHourDatas({
        pairAddress,
        hoursFromNow: hoursFromNow,
      });

      dispatch({
        type: UPDATE_CHART_STATS,
        data: { chartData: pairHourDatas, snapshotPeriod: 'hour' },
      });
    } else {
      console.log('getPairDayDatas', Math.floor(hoursFromNow / 24));
      const { pairDayDatas } = await getPairDayDatas({
        pairAddress,
        daysFromNow: parseInt(hoursFromNow / 24),
        hoursFromNow: hoursFromNow,
      });

      dispatch({
        type: UPDATE_CHART_STATS,
        data: { chartData: pairDayDatas, snapshotPeriod: 'day' },
      });
    }
  } catch (e) {
    console.log('[ERROR] getPairInfo', e);
  }
};

const PairStatsContext = createContext([defaultPairStats, {}]);
const PairStatsConsumer = PairStatsContext.Consumer;
const PairStatsProvider = ({ children, value: initialValue }) => {
  const [state, dispatch] = useReducer(PairStatsReducer, {
    ...defaultPairStats,
    ...initialValue,
  });
  const contextActions = useRef({
    updatePairInfo: (pairInfo) =>
      dispatch({ type: UPDATE_PAIR_INFO, data: pairInfo }),
    updatePairDailyStats: (pairInfo) =>
      dispatch({ type: UPDATE_PAIR_DAILY_STATS, data: pairInfo }),
    updateSelectedPair: (pairId) =>
      dispatch({ type: UPDATE_SELECTED_PAIR, data: { selectedPair: pairId } }),
    updateChartDateRange: (range) =>
      dispatch({
        type: UPDATE_CHART_DATE_RANGE,
        data: { chartDateRange: range },
      }),
    updateAverageFilter: (filter) => {
      dispatch({
        type: UPDATE_AVG_FILTER,
        data: { avgFilterSelected: filter },
      });
    },
  });

  useEffect(() => {
    if (state.selectedPair) {
      getPairInfo({ pair: state.selectedPair, dispatch });
      getPairDailyStats({ pairAddress: state.selectedPair, dispatch });

      if (state.chartDateRange.hoursFromNow) {
        getChartStats({
          pairAddress: state.selectedPair,
          hoursFromNow: state.chartDateRange.hoursFromNow,
          period: state.chartDateRange.selectedPeriod,
          dispatch,
        });
      }
    }
  }, [state.selectedPair]);

  useEffect(() => {
    if (state.selectedPair && state.chartDateRange.hoursFromNow) {
      getChartStats({
        pairAddress: state.selectedPair,
        hoursFromNow: state.chartDateRange.hoursFromNow,
        period: state.chartDateRange.selectedPeriod,
        dispatch,
      });
    }
  }, [state.selectedPair, state.chartDateRange]);

  // saves last change to local state
  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
  }, [state]);

  return (
    <PairStatsContext.Provider value={[state, contextActions.current]}>
      {children}
    </PairStatsContext.Provider>
  );
};

export default PairStatsContext;
export { PairStatsProvider, PairStatsConsumer };
