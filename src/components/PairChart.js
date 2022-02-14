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
import AverageFilter from './AvgFilter';

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
  const [{ avgFilterSelected, isLoadingChart, chartHourlyData }] = useContext(
    PairStatsContext
  );

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
  console.log(typeof avgFilterSelected);
  const data = {
    labels:
      isLoadingChart && chartLabels.length < 0 ? [] : chartLabels.reverse(),
    datasets: [
      {
        label: `APR % (${avgFilterSelected}hs average)`,
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
            px={4}
            mb={1}
            w="100%"
            borderBottom="1px solid"
            borderColor="border.decorative"
            flexDirection={{ base: 'column', lg: 'row' }}
            alignItems={{ base: 'start', lg: 'center' }}
          >
            <Flex mr={{ base: 0, lg: 5 }} mb={{ base: 3, lg: 0 }}>
              <Text textStyle="body2Heavy">Annualized APR</Text>
            </Flex>
            <Flex
              mb={{ base: 3, lg: 0 }}
              mx={{ base: 0, lg: 5 }}
              px={{ base: 0, lg: 5 }}
              borderX={{ base: '', lg: '1px solid' }}
              borderColor="border.decorative"
            >
              <PeriodSelector />
            </Flex>
            <Flex
              ml={{ base: 0, lg: 5 }}
              pl={{ base: 0, lg: 4 }}
              alignItems={'center'}
              justifyContent="center"
            >
              <Text fontSize={'sm'} textColor={'txt.muted'} mr={3}>
                Average Stats Filter
              </Text>
              <AverageFilter />
            </Flex>
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
