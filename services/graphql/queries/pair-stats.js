import { gql } from '@apollo/client';

const GET_PAIR_HOUR_DATAS = gql`
  query PairHourDatas(
    $hourCount: Int!
    $nowUnixTimestamp: Int!
    $pairAddress: ID!
    $orderBy: String!
  ) {
    pairHourDatas(
      first: $hourCount
      orderBy: $orderBy
      orderDirection: desc
      where: { pair: $pairAddress, hourStartUnix_lte: $nowUnixTimestamp }
    ) {
      id
      pair {
        id
      }
      hourStartUnix
      reserveUSD
      hourlyVolumeUSD
      hourlyTxns
    }
  }
`;

export default GET_PAIR_HOUR_DATAS;
