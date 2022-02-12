import { useContext } from 'react';
import PairStatsContext from 'contexts/PairStatsContext';
import { HStack, VStack, Spinner, Box, Flex, Text } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import PeriodSelector from './PeriodSelector';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PairChart = () => {
  const [
    { chardDateRange, chartAverageHours, isLoadingChart, chartHourlyData },
  ] = useContext(PairStatsContext);

  const chartLabels =
    chartHourlyData.length > 0
      ? chartHourlyData.map((item) => {
          return item.label;
        })
      : [];

  const chartData =
    chartHourlyData.length > 0
      ? chartHourlyData.map((item) => {
          return item.data;
        })
      : [];
  // console.log(chartData, chartLabels);
  // if (!chartData || !chartLabels) {
  //   return <Spinner />;
  // }

  const data = {
    labels:
      isLoadingChart && chartLabels.length < 0 ? [] : chartLabels.reverse(),
    datasets: [
      {
        label: `APR % (${chartAverageHours}hs average)`,
        lineTension: 0.03,
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: '#2E71F0',
        borderCapStyle: 'butt',
        borderDash: [],
        maintainAspectRatio: false,
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#2E71F0',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: 'rgba(46,113,240,0.7)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 3,
        pointRadius: 4,
        pointHitRadius: 10,
        data: isLoadingChart && chartData.length < 0 ? [] : chartData.reverse(),
      },
    ],
  };

  return (
    <Flex
      flexDirection={'column'}
      // backgroundColor="bg.primary"
      border="1px solid"
      borderColor="border.decorative"
      borderRadius="lg"
      alignItems={'start'}
      justifyContent={'center'}
      w="100%"
      px={5}
      py={5}
      m={2}
    >
      <HStack>
        <Text mb={2} mr={3} textStyle="title2Heavy">
          Pair Performance
        </Text>
        {isLoadingChart && <Spinner size="sm" />}
      </HStack>

      <Flex
        flexDirection={'column'}
        backgroundColor="bg.primary"
        border="1px solid"
        borderColor="border.decorative"
        borderRadius="lg"
        alignItems={'start'}
        justifyContent={'center'}
        w="100%"
        py={5}
      >
        <VStack alignItems={'start'} w="100%">
          <HStack
            pb={4}
            px={5}
            mb={1}
            w="100%"
            borderBottom="1px solid"
            borderColor="border.decorative"
          >
            <Flex
              mr={5}
              pr={5}
              borderRigth="2px solid"
              borderColor="border.decorative"
            >
              <Text textStyle="body2Heavy">Annualized APR</Text>
            </Flex>
            <Box>
              <PeriodSelector />
            </Box>
          </HStack>
          <Flex w="100%" maxW="100%" h="400px" px={5}>
            <Line data={data} width={1000} height={300} />
          </Flex>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default PairChart;
