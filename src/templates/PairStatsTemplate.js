import Layout from 'components/Layout';
import PairInfo from 'components/PairInfo';
import PairDailyStats from 'components/PairDailyStats';
import PairChart from 'components/PairChart';

const PairStatsTemplate = () => {
  return (
    <>
      <Layout>
        <PairInfo />
        <PairDailyStats />
        <PairChart />
      </Layout>
    </>
  );
};

export default PairStatsTemplate;
