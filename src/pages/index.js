import Head from 'next/head';
import PairStatsTemplate from 'templates/PairStatsTemplate';
import { PairStatsProvider } from 'contexts/PairStatsContext';

// Uniswap v2 Stats Dashboard - created by Francisco Baralle for ITB challenge
const UniStats = () => {
  console.log(
    '%cUniswap v2 Stats Dashboard - created by Francisco Baralle for ITB challenge',
    'color:grey;font-weight:bold;background-color: black;'
  );
  return (
    <div className="container">
      <Head>
        <title>Uniswap v2 Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PairStatsProvider>
        <PairStatsTemplate />
      </PairStatsProvider>
    </div>
  );
};

export default UniStats;
