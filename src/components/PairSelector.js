import { useContext } from 'react';
import PairStatsContext from 'contexts/PairStatsContext';
import { Select, HStack, VStack, Spinner, Flex, Text } from '@chakra-ui/react';
import { DEFAULT_PAIRS } from 'constants';

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
    <Flex my={3} py={2} pxx={3} backgroundColor="bg." flexDirection={'column'}>
      <Text mb={2} textStyle={'body2Heavy'}>
        Pair select
      </Text>
      <HStack>
        <Select
          isDisabled={isLoadingPairInfo}
          placeholder={
            isLoadingPairInfo ? 'Loading pairs...' : '--- Select pair ---'
          }
          defaultValue={selectedPair || ''}
          onChange={(e) => handleUpdateSelectedPair(e.target.value)}
        >
          {DEFAULT_PAIRS.map(({ pairId, label }) => {
            return (
              <option value={pairId}>{`${label} - ${pairId.slice(
                0,
                6
              )}...${pairId.slice(-5, -1)}`}</option>
            );
          })}
        </Select>
        {isLoadingPairInfo && <Spinner size="sm" />}
      </HStack>
    </Flex>
  );
};

export default PairSelector;
