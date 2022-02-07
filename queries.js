const PAIR_DATA = `{
  pair(id: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"){
      token0 {
        name
        symbol
      }
      token1 {
        name
        symbol
      }
  }
    pairDayDatas(first: 3, orderBy: date, orderDirection: desc ,where: {pairAddress: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc", date_lte: 1643908080}) {
      date(formatString: "MMMM DD, YYYY")
      dailyVolumeUSD
    }
  }`;

const PAIR_LIST = `{
    pairs(id: ["0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc", "0xbc9d21652cca70f54351e3fb982c6b5dbe992a22"]){
      id
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
      }
    }
}`;
