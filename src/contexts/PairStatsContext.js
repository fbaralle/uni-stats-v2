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
import { pairHourDatasMock } from 'server/mock-hour-stats';
import { getPairHourDatas } from 'server/pair-stats';
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
    // const { pairHourDatas } = await getPairHourDatas({
    //   pairAddress,
    //   hoursFromNow: DAY_HOURS * 2,
    // });
    // console.log(pairHourDatas);
    // const pairData = pairs.length > 0 ? pairs[0] : {};
    dispatch({
      type: UPDATE_PAIR_DAILY_STATS,
      data: pairHourDatasMock,
    });
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
  });

  useEffect(() => {
    if (state.selectedPair) {
      getPairInfo({ pair: state.selectedPair, dispatch });
      getPairDailyStats({ pairAddress: state.selectedPair, dispatch });
    }
  }, [state.selectedPair]);

  console.log('SELECTED PAIR=', state.selectedPair);
  return (
    <PairStatsContext.Provider value={[state, contextActions.current]}>
      {children}
    </PairStatsContext.Provider>
  );
};

export default PairStatsContext;
export { PairStatsProvider, PairStatsConsumer };
