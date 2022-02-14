import Head from 'next/head';
import { checkAndRefreshStats } from 'server/refresh-stats';
import PairStatsTemplate from 'templates/PairStatsTemplate';

const UniStats = ({ pairs, pairStoredData }) => {
  return (
    <div className="container">
      <Head>
        <title>Uniswap v2 Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PairStatsTemplate />
    </div>
  );
};

export async function getServerSideProps(context) {
  let pairs = {};
  let pairHourData = {};
  let pairStoredData = {};

  try {
    await checkAndRefreshStats();
  } catch (e) {
    console.log('Failed initialisation', e);
  }

  return {
    props: {
      pairs,
    },
  };
}

export default UniStats;
