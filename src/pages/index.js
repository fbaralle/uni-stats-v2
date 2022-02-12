import Head from 'next/head';
import { Flex } from '@chakra-ui/react';
import { checkAndRefreshStats } from 'server/refresh-stats';
import Layout from 'components/Layout';
import Header from 'components/Header';
import PairInfo from 'components/PairInfo';
import PairDailyStats from 'components/PairDailyStats';
import PairChart from 'components/PairChart';

const UniStats = ({ pairs, pairStoredData }) => {
  return (
    <div className="container">
      <Head>
        <title>Uniswap v2 Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        h="100vh"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Header />
        <Layout>
          <PairInfo />
          <PairDailyStats />
          <PairChart />
        </Layout>
      </Flex>
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
