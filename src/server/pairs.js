import client from 'server/graphql/apollo-client';
import GET_PAIRS from 'server/graphql/queries/pairs';

export const getPairs = async (pairsList = []) => {
  if (pairsList.length < 1) {
    throw new Error('[ERROR] getPairs: Invalid pair', pairsList);
  }
  try {
    const { data, error } = await client.query({
      query: GET_PAIRS,
      variables: { pairIds: [...pairsList] },
    });

    return data;
  } catch (e) {
    console.log('[ERROR] getPairs: ', e);
  }
};
