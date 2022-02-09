import client from 'server/graphql/apollo-client';
import GET_PAIRS from 'server/graphql/queries/pairs';

const DEFAULT_PAIRS = [
  '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
  '0xbc9d21652cca70f54351e3fb982c6b5dbe992a22',
];

export const getPairs = async (pairsList = []) => {
  try {
    const { data, error } = await client.query({
      query: GET_PAIRS,
      variables: { pairIds: [...pairsList, ...DEFAULT_PAIRS] },
    });

    return data;
  } catch (e) {
    console.log('[ERROR] getPairs: ', e);
  }
};
