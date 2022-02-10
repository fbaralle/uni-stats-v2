import { useContext } from 'react';
import { Skeleton, Text, Flex } from '@chakra-ui/react';
import PairStatsContext from 'contexts/PairStatsContext';
import PairSelector from 'components/PairSelector';
import { roundDecimals } from 'utils/general';

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
  return (
    <Flex
      flexDirection={'column'}
      backgroundColor="bg.primary"
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
      <PairSelector />
      {selectedPair ? (
        <>
          <Skeleton isLoaded={!isLoadingPairInfo}>
            {pairData?.tokenSymbols && (
              <Text
                textStyle="title2Heavy"
                mb={3}
              >{`Pair ${pairData.tokenSymbols}`}</Text>
            )}
          </Skeleton>
          <Skeleton isLoaded={!isLoadingPairInfo}>
            <Flex
              border="1px solid"
              borderRadius={'md'}
              borderColor="border.decorative"
              alignContent={'center'}
              p={2}
              mb={2}
            >
              <Text textStyle="body2">{`1 ${token0.symbol} = ${roundDecimals(
                token1Price,
                token0.decimals
              )} ${token1.symbol}`}</Text>
            </Flex>
          </Skeleton>
          <Skeleton isLoaded={!isLoadingPairInfo}>
            <Flex
              border="1px solid"
              borderRadius={'md'}
              borderColor="border.decorative"
              alignContent={'center'}
              p={2}
              mb={2}
            >
              <Text textStyle="body2">{`1 ${token1.symbol} = ${roundDecimals(
                token0Price,
                token1.decimals
              )} ${token1.symbol}`}</Text>
            </Flex>
          </Skeleton>
        </>
      ) : (
        <Text>Select a pair to get stats</Text>
      )}
    </Flex>
  );
};

export default PairInfo;
