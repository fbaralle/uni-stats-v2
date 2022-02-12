import { gql } from '@apollo/client';

const GET_PAIR_HOUR_DATAS = gql`
  query PairHourDatas(
    $hourCount: Int!
    $nowUnixTimestamp: Int!
    $startUnixTimestamp: Int!
    $pairAddress: ID!
    $orderBy: String!
  ) {
    pairHourDatas(
      first: $hourCount
      orderBy: $orderBy
      orderDirection: desc
      where: {
        pair: $pairAddress
        hourStartUnix_lte: $nowUnixTimestamp
        hourStartUnix_gte: $startUnixTimestamp
      }
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
    $startUnixTimestamp: Int!
    $pairAddress: ID!
    $orderBy: String!
  ) {
    pairDayDatas(
      first: $dayCount
      orderBy: $orderBy
      orderDirection: desc
      where: {
        pairAddress: $pairAddress
        date_lte: $nowUnixTimestamp
        date_gte: $startUnixTimestamp
      }
    ) {
      id
      pairAddress
      reserveUSD
      dailyVolumeUSD
      date
    }
  }
`;

export default GET_PAIR_HOUR_DATAS;
