import { useContext } from 'react';
import {
  Skeleton,
  SkeletonCircle,
  Text,
  Flex,
  Box,
  VStack,
  HStack,
} from '@chakra-ui/react';
import PairStatsContext from 'contexts/PairStatsContext';
import PairSelector from 'components/PairSelector';
import { roundDecimals } from 'utils/general';
import CurrencyIcon from './CurrencyIcon';

const PairInfo = () => {
  const [
    {
      isLoadingPairInfo,
      token0,
      token1,
      token0Price,
      token1Price,
      pairData,
      selectedPair,
    },
  ] = useContext(PairStatsContext);

  // const isLoadingPairInfo = true;
  return (
    <Flex
      flexDirection={{ base: 'column', sm: 'row' }}
      border="1px solid"
      borderColor="border.decorative"
      borderRadius="lg"
      alignItems={'end'}
      justifyContent={'start'}
      w="100%"
      px={5}
      py={5}
      m={2}
    >
      <PairSelector />
      {selectedPair ? (
        <VStack
          alignItems={'start'}
          ml={8}
          direction={{ base: 'column', sm: 'row' }}
        >
          <HStack justifyContent={'center'} mb={2}>
            <Skeleton isLoaded={!isLoadingPairInfo}>
              {pairData?.tokenSymbols && (
                <Text
                  textStyle="title2Heavy"
                  mr={2}
                >{`Pair ${pairData.tokenSymbols}`}</Text>
              )}
            </Skeleton>
            <SkeletonCircle isLoaded={!isLoadingPairInfo} size="7">
              {token0.symbol && <CurrencyIcon currency={token0.symbol} />}
            </SkeletonCircle>
            <SkeletonCircle isLoaded={!isLoadingPairInfo} size="7">
              {token1.symbol && <CurrencyIcon currency={token1.symbol} />}
            </SkeletonCircle>
          </HStack>

          <HStack>
            <Skeleton isLoaded={!isLoadingPairInfo}>
              <Flex
                backgroundColor="bg.primary"
                borderRadius={'md'}
                border="3px solid"
                borderColor="border.decorative"
                alignContent={'center'}
                p={2}
              >
                <Text textStyle="body2">{`1 ${token0.symbol} = ${roundDecimals(
                  token1Price,
                  token1.decimals
                )} ${token1.symbol}`}</Text>
              </Flex>
            </Skeleton>
            <Skeleton isLoaded={!isLoadingPairInfo}>
              <Flex
                backgroundColor="bg.primary"
                border="3px solid"
                borderRadius={'md'}
                borderColor="border.decorative"
                alignContent={'center'}
                p={2}
              >
                <Text textStyle="body2">{`1 ${token1.symbol} = ${roundDecimals(
                  token0Price,
                  token0.decimals
                )} ${token0.symbol}`}</Text>
              </Flex>
            </Skeleton>
          </HStack>
        </VStack>
      ) : (
        <Box mx={3} mb={3}>
          <Text>Select a pair to get stats</Text>
        </Box>
      )}
    </Flex>
  );
};

export default PairInfo;
