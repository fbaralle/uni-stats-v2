import { getPairHourDatas } from 'services';
import PairHourData from 'services/database/models/pair-hour-data';
import {
  getCurrentUnixTimestamp,
  convertUnixToMs,
  getParsedDbData,
  checkIsLastStatExpired,
  getCurrentMsTimestamp,
} from 'utils/general';

// const INITIAL_FEED_HOURS_AMOUNT = 48;
const INITIAL_FEED_HOURS_AMOUNT = 4;
const DEFAULT_PAIRS = [
  '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
  '0xbc9d21652cca70f54351e3fb982c6b5dbe992a22',
];

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

export const checkAndRefreshStats = async (pairAddress = DEFAULT_PAIRS[0]) => {
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

    const hoursAmount =
      isLastStatExpired && !pendingInitialFeed ? 1 : INITIAL_FEED_HOURS_AMOUNT;

    console.log(
      '[DB Init] getting initial stats from last ',
      hoursAmount,
      'hours'
    );
    const initialPairStats = await getPairStats(pairAddress, hoursAmount);

    console.log(
      'initialPairStats=',
      initialPairStats.length,
      'items collected'
    );

    if (initialPairStats.length > 0) {
      try {
        const response = await saveManyToDb(initialPairStats);
        return console.log(
          'Successfully refreshed pair values, id=',
          pairAddress,
          response
        );
      } catch (e) {
        throw new Error('[ERROR] Error saving to DB', e);
      }
    }
  } else {
    console.log('[DB Init] Every pair has valid statistics');
  }
};

// export const feedDb = async () => {
//   try {
//     console.log('feeding db');
//     const pairData = new PairHourData({
//       hourStartUnix: 1644098400,
//       hourlyVolumeUSD: '257726.86563225473733289498808541',
//       snapshotId: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc-456694',
//       pairId: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
//       reserveUSD: '232982711.6579611027581994085644555',
//     });

//     const response = await pairData.saveOne();
//     console.log(response);
//     return response;
//   } catch (e) {
//     console.log('[ERROR]', e);
//   }
// };

// feed DB with the last 48 hour data for a determined pair
// export const saveManyToDb = async (entries) => {
//   try {
//     console.log('feeding db many');
//     // const pairData = entries.map(
//     //   ({ id, pair, ...props }) =>
//     //     new PairHourData({
//     //       snapshotId: id,
//     //       pairId: pair.id,
//     //       ...props,
//     //     })
//     // );
//     const response = await PairHourData.saveMany(pairData);

//     return response;
//   } catch (e) {
//     console.log('[ERROR]', e);
//   }
// };
