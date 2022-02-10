import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Skeleton,
} from '@chakra-ui/react';
import { formatPercent } from 'utils/uniswap';

const StatCard = ({ label, number, changeRate, isLoading }) => {
  const isNegativeChange = changeRate < 0;
  return (
    <Stat
      backgroundColor="bg.primary"
      border="1px solid"
      borderColor="border.decorative"
      borderRadius="lg"
      minWidth="260px"
      p={4}
      py={3}
      my={2}
      mr={4}
    >
      <StatLabel mb={1}>{label || ''}</StatLabel>
      <Skeleton isLoaded={!isLoading}>
        <StatNumber mb={1}>{number || '0.0'}</StatNumber>
      </Skeleton>
      <Skeleton isLoaded={!isLoading}>
        {changeRate && (
          <StatHelpText>
            <StatArrow type={isNegativeChange ? 'decrease' : 'increase'} />
            {formatPercent(changeRate)}
          </StatHelpText>
        )}
      </Skeleton>
    </Stat>
  );
};

export default StatCard;
