import { useEffect } from 'react';
import Head from 'next/head';
import { Flex, StatGroup } from '@chakra-ui/react';
import { checkAndRefreshStats } from 'server/refresh-stats';
import Layout from 'components/Layout';
import Header from 'components/Header';
import StatCard from 'components/StatCard';

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
          <StatGroup>
            <StatCard
              label="Total Liquidity"
              number="$237,146,369"
              changeRate="+0.2%"
            />
            <StatCard
              label="Volume (24hs)"
              number="$25,378,892"
              changeRate="+11%"
            />
            <StatCard label="Fees (24hs)" number="$76,137" changeRate="+11%" />
            <StatCard
              label="Annualized APR (24hs)"
              number="13%"
              changeRate="+5%"
            />
          </StatGroup>
        </Layout>
      </Flex>
    </div>
  );
};

export async function getServerSideProps(context) {
  let pairs = {};
  let pairHourData = {};
  let isConnected;
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
