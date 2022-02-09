import { gql } from '@apollo/client';

const GET_PAIRS = gql`
  query Pairs($pairIds: [String]!) {
    pairs(where: { id_in: $pairIds }) {
      id
      token0Price
      token1Price
      volumeUSD
      reserve0
      reserve1
      reserveUSD
      token0 {
        symbol
        name
        decimals
        totalLiquidity
      }
      token1 {
        symbol
        name
        decimals
        totalLiquidity
      }
    }
  }
`;

export default GET_PAIRS;
