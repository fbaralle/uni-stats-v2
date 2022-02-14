import { useContext } from 'react';
import {
  Skeleton,
  Text,
  Flex,
  StatGroup,
  HStack,
  Icon,
} from '@chakra-ui/react';
import StatCard from 'components/StatCard';
import PairStatsContext from 'contexts/PairStatsContext';
import PairSelector from 'components/PairSelector';
import { checkIsLastStatExpired, roundDecimals } from 'utils/general';
import { formatCurrencyUSD, formatPercent } from 'utils/uniswap';
import { formatMsToHumanDate } from 'utils/dates';

const PairDailyStats = () => {
  const [
    {
      isLoadingPairDailyStats,
      totalLiquidityUSD,
      dailyVolumeUSD,
      dalilyFeesUSD,
      dailyAnnualizedAPR,
      dailyVolumeChangeRate,
      dailyFeesChangeRate,
      dailyAnnualizedAPRChangeRate,
      dailyLiquitityChangeRate,
      dailyStatsUpdatedAtMs,
      selectedPair,
    },
  ] = useContext(PairStatsContext);

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
      <HStack alignItems={'center'}>
        <Text textStyle={'title2Heavy'} mr={3}>
          Daily Stats
        </Text>
        {selectedPair && !isLoadingPairDailyStats && (
          <Text
            textColor={'txt.muted'}
            fontSize="sm"
          >{`Updated at ${formatMsToHumanDate(dailyStatsUpdatedAtMs)}`}</Text>
        )}
        {selectedPair &&
          !isLoadingPairDailyStats &&
          !checkIsLastStatExpired(dailyStatsUpdatedAtMs) && (
            <Icon viewBox="0 0 200 200" color={'green.300'} boxSize={3}>
              <path
                fill="currentColor"
                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
              />
            </Icon>
          )}
      </HStack>
      <StatGroup flexDirection={{ base: 'column', md: 'row' }} width="100%">
        <StatCard
          label="Total Liquidity"
          number={formatCurrencyUSD(totalLiquidityUSD)}
          changeRate={dailyLiquitityChangeRate}
          isLoading={isLoadingPairDailyStats}
        />
        <StatCard
          label="Volume (24hs)"
          number={formatCurrencyUSD(dailyVolumeUSD)}
          changeRate={dailyVolumeChangeRate}
          isLoading={isLoadingPairDailyStats}
        />
        <StatCard
          label="Fees (24hs)"
          number={formatCurrencyUSD(dalilyFeesUSD)}
          changeRate={dailyFeesChangeRate}
          isLoading={isLoadingPairDailyStats}
        />
        <StatCard
          label="Annualized APR (24hs)"
          number={formatPercent(dailyAnnualizedAPR)}
          changeRate={dailyAnnualizedAPRChangeRate}
          isLoading={isLoadingPairDailyStats}
        />
      </StatGroup>
    </Flex>
  );
};

export default PairDailyStats;
