import { useContext } from 'react';
import PairStatsContext from 'contexts/PairStatsContext';
import { Select, HStack, VStack, Spinner, Flex, Text } from '@chakra-ui/react';
import { DEFAULT_PAIRS } from 'constants/index';

const PairSelector = () => {
  const [
    { isLoadingPairInfo, selectedPair },
    { updateSelectedPair },
  ] = useContext(PairStatsContext);
  // const isLoading = true;
  const handleUpdateSelectedPair = (value) => {
    updateSelectedPair(value);
  };
  return (
    <Flex mt={2} px={2} flexDirection={'column'}>
      <Text mb={2} textStyle={'body2Heavy'}>
        Pair select
      </Text>
      <HStack>
        <Select
          isDisabled={isLoadingPairInfo}
          border="3px solid"
          placeholder={
            isLoadingPairInfo ? 'Loading pairs...' : '--- Select pair ---'
          }
          defaultValue={selectedPair || ''}
          onChange={(e) => handleUpdateSelectedPair(e.target.value)}
        >
          {DEFAULT_PAIRS.map(({ pairId, label }) => {
            return (
              <option key={pairId} value={pairId}>{`${label} - ${pairId.slice(
                0,
                6
              )}...${pairId.slice(pairId.length - 5, pairId.length)}`}</option>
            );
          })}
        </Select>
        {isLoadingPairInfo && <Spinner size="sm" />}
      </HStack>
    </Flex>
  );
};

export default PairSelector;
