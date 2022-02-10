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

export const GET_PAIR_DAY_DATAS = gql`
  query PairDayDatas(
    $dayCount: Int!
    $nowUnixTimestamp: Int!
    $pairAddress: ID!
    $orderBy: String!
  ) {
    pairDayDatas(
      first: $dayCount
      orderBy: $orderBy
      orderDirection: desc
      where: { pair: $pairAddress, date_lte: $nowUnixTimestamp }
    ) {
      id
      pairAddress
      reserveUSD
      dailyVolumeUSD
    }
  }
`;

export default GET_PAIR_HOUR_DATAS;
