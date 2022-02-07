import client from 'services/graphql/apollo-client';
import GET_PAIR_HOUR_DATAS from 'services/graphql/queries/pair-stats';

const getUnixTimestamp = () => Math.round(new Date().getTime() / 1000);

export const getPairHourDatas = async ({ pairAddress, hoursFromNow }) => {
  try {
    const { data, error } = await client.query({
      query: GET_PAIR_HOUR_DATAS,
      variables: {
        pairAddress,
        nowUnixTimestamp: getUnixTimestamp(),
        hourCount: hoursFromNow,
        orderBy: 'hourStartUnix',
      },
    });
    return data;
  } catch (e) {
    console.log('[ERROR] getPairHourDatas: ', e);
  }
};
