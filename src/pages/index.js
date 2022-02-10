import { useEffect } from 'react';
import Head from 'next/head';
import { Flex } from '@chakra-ui/react';
import { checkAndRefreshStats } from 'server/refresh-stats';
import Layout from 'components/Layout';
import Header from 'components/Header';

import PairInfo from 'components/PairInfo';
import PairDailyStats from 'components/PairDailyStats';

const Home = ({ pairs, pairStoredData }) => {
  console.log(pairs);
  console.log('pairStoredData=', pairStoredData);
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
        </Layout>
      </Flex>
    </div>
  );
};

export async function getServerSideProps(context) {
  let pairs = {};
  let pairHourData = {};
  let collections;
  let pairStoredData = {};

  try {
    await checkAndRefreshStats();
  } catch (e) {
    console.log('Failed initialisation', e);
  }

  return {
    props: {
      pairs,
      pairHourData: pairHourData ?? null,
      collections: collections ?? 'No collections created',
      pairStoredData: pairStoredData ?? null,
    },
  };
}

export default Home;