import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Skeleton,
} from '@chakra-ui/react';

const StatCard = ({ label, number, changeRate, isLoading }) => {
  return (
    <Stat
      backgroundColor="bg.primary"
      border="1px solid"
      borderColor="border.decorative"
      borderRadius="lg"
      w="200px"
      px={4}
      py={3}
      m={2}
    >
      <StatLabel mb={1}>{label || ''}</StatLabel>
      <Skeleton isLoaded={!isLoading}>
        <StatNumber mb={1}>{number || '0.0'}</StatNumber>
      </Skeleton>
      <Skeleton isLoaded={!isLoading}>
        {changeRate && (
          <StatHelpText>
            <StatArrow type="increase" />
            {changeRate}
          </StatHelpText>
        )}
      </Skeleton>
    </Stat>
  );
};

export default StatCard;
