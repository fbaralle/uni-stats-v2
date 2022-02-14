import Head from 'next/head';
import { checkAndRefreshStats } from 'server/refresh-stats';
import PairStatsTemplate from 'templates/PairStatsTemplate';
import { PairStatsProvider } from 'contexts/PairStatsContext';

const UniStats = () => {
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

export async function getServerSideProps() {
  try {
    await checkAndRefreshStats();
  } catch (e) {
    console.log('Failed initialisation', e);
  }

  return {
    props: {
      pairs: {},
    },
  };
}

export default UniStats;
