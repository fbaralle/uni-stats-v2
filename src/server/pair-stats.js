import client from 'server/graphql/apollo-client';
import GET_PAIR_HOUR_DATAS, {
  GET_PAIR_DAY_DATAS,
} from 'server/graphql/queries/pair-stats';
import {
  getUnixDateInDaysFromNow,
  getUnixDateInHoursFromNow,
} from 'utils/dates';

const getUnixTimestamp = () => Math.round(new Date().getTime() / 1000);

export const getPairHourDatas = async ({ pairAddress, hoursFromNow }) => {
  try {
    const { data, error } = await client.query({
      query: GET_PAIR_HOUR_DATAS,
      variables: {
        pairAddress,
        nowUnixTimestamp: getUnixTimestamp(),
        hourCount: hoursFromNow,
        startUnixTimestamp: getUnixDateInHoursFromNow(hoursFromNow),
        orderBy: 'hourStartUnix',
      },
    });
    return data;
  } catch (e) {
    console.log('[ERROR] getPairHourDatas: ', e);
  }
};

export const getPairDayDatas = async ({
  pairAddress,
  daysFromNow,
  hoursFromNow,
}) => {
  try {
    const { data, error } = await client.query({
      query: GET_PAIR_DAY_DATAS,
      variables: {
        pairAddress,
        nowUnixTimestamp: getUnixTimestamp(),
        dayCount: daysFromNow,
        startUnixTimestamp: getUnixDateInHoursFromNow(hoursFromNow),
        orderBy: 'date',
      },
    });
    return data;
  } catch (e) {
    console.log('[ERROR] getPairDayDatas: ', e);
  }
};
