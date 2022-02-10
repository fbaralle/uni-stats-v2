import { gql } from '@apollo/client';

const GET_PAIRS = gql`
  query Pairs($pairIds: [String]!) {
    pairs(where: { id_in: $pairIds }) {
      id
      token0Price
      token1Price
      reserve0
      reserve1
      reserveUSD
      volumeUSD
      totalSupply
      createdAtTimestamp
      token0 {
        symbol
        name
        decimals
        derivedETH
        totalLiquidity
      }
      token1 {
        symbol
        name
        decimals
        derivedETH
        totalLiquidity
      }
    }
  }
`;

export default GET_PAIRS;
