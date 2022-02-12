import { DEFAULT_PAIRS } from 'constants';
import { getPairHourDatas } from 'server';
import PairHourData from 'server/database/models/pair-hour-data';
import { getParsedDbData, checkIsLastStatExpired } from 'utils/general';
import {
  getCurrentUnixTimestamp,
  convertUnixToMs,
  getCurrentMsTimestamp,
} from 'utils/dates';

// const INITIAL_FEED_HOURS_AMOUNT = 48;
const INITIAL_FEED_HOURS_AMOUNT = 4;

export const checkPairLastSavedSnapshot = async (
  pairAddress = '',
  hoursAmount = 1
) => {
  if (!pairAddress) {
    throw new Error('Invalid pair address');
  }

  try {
    const pairsLastHourData = await PairHourData.findLastEntriesByPairId(
      pairAddress,
      {
        limit: hoursAmount,
        hourStartUnix: { $lte: getCurrentUnixTimestamp() },
      }
    );
    console.log('last items, before', Date().toLocaleString(), pairAddress, {
      limit: hoursAmount,
      hourStartUnix: { $lte: getCurrentUnixTimestamp() },
    });
    const parsedData = getParsedDbData(pairsLastHourData);
    const hasValidStats =
      parsedData.length > 0 && parsedData[0].pairId === pairAddress;
    const lastStoredMsTimestamp =
      hasValidStats && convertUnixToMs(parsedData[0].hourStartUnix);
    const isLastStatExpired =
      hasValidStats && lastStoredMsTimestamp
        ? checkIsLastStatExpired(lastStoredMsTimestamp)
        : false;

    return {
      pairLastStats: parsedData,
      isLastStatExpired,
      pendingInitialFeed: !hasValidStats,
    };
  } catch (e) {
    console.log('[ERROR] checkPairLastStats', e);
  }
};

export const getPairStats = async (pairAddress, hourAmount = 1) => {
  try {
    const data = await getPairHourDatas({
      pairAddress,
      hoursFromNow: hourAmount,
    });

    return data?.pairHourDatas;
  } catch (e) {
    throw new Error('[ERROR] getInitialPairStats', e);
  }
};

export const saveManyToDb = async (pairHourDatasArray) => {
  const pairHourDatasDocsArray = pairHourDatasArray.map(
    ({ id, pair, ...props }) =>
      new PairHourData({
        snapshotId: id,
        pairId: pair.id,
        ...props,
      })
  );

  try {
    console.log('[SUCCESS] saveManyToDb');
    const response = await PairHourData.saveMany(pairHourDatasDocsArray);
    return response;
  } catch (e) {
    throw new Error('[ERROR] saveManyToDb', e);
  }
};

export const checkAndRefreshStats = async (
  pairAddress = DEFAULT_PAIRS[0].pairId
) => {
  let lastStats;
  try {
    console.log('[DB Init] Checking last pair stats');
    lastStats = await checkPairLastSavedSnapshot(pairAddress);
    console.log('Pair last stats', lastStats);
  } catch (e) {
    throw new Error('[ERROR] Failed checking stats', e);
  }

  if (lastStats?.pendingInitialFeed || lastStats?.isLastStatExpired) {
    const { isLastStatExpired, pendingInitialFeed } = lastStats;

    // Init rule
    // Fetches stats from the las 48 hours if db is empty.
    // If last saved record is older than an hour, fetches last hour
    const hoursAmount =
      isLastStatExpired && !pendingInitialFeed ? 1 : INITIAL_FEED_HOURS_AMOUNT;

    console.log(
      '[DB Init] getting initial stats from last ',
      hoursAmount,
      'hours'
    );
    const initialPairStats = await getPairStats(pairAddress, hoursAmount);

    if (initialPairStats.length > 0) {
      try {
        const response = await saveManyToDb(initialPairStats);
        console.log(
          `Successfully refreshed pair values, id=${pairAddress}`,
          `Added data from the last ${hoursAmount} hours`,
          response
        );
        return response;
      } catch (e) {
        throw new Error('[ERROR] Error saving to DB', e);
      }
    }
  } else {
    console.log('[DB Init] Every pair has valid/updated statistics');
  }
};

// To Do: create a Node Cron process that refreshes stats
// every 20 minutes and stores the event result in a new collection
