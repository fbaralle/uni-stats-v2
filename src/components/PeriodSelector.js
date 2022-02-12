import { HStack, Box, useRadioGroup, useRadio } from '@chakra-ui/react';
import { useContext } from 'react';
import PairStatsContext from 'contexts/PairStatsContext';

const RadioCard = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'bg.brand',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={3}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
};

const options = ['day', 'week', '1 month', '3 month', '6 month'];

const hoursFromNow = (period) => {
  switch (period) {
    case 'day':
      return 24;
    case 'week':
      return 24 * 7;
    case '1 month':
      return 24 * 30;
    case '3 month':
      return 24 * 30 * 3;
    case '6 month':
      return 24 * 30 * 6;
    default:
      return 24;
  }
};

const PeriodSelector = () => {
  const [{ chartDateRange }, { updateChartDateRange }] = useContext(
    PairStatsContext
  );
  const onDateChanges = (period) => {
    updateChartDateRange({
      hoursFromNow: hoursFromNow(period),
      selectedPeriod: period,
    });
  };
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'period',
    defaultValue: chartDateRange.selectedPeriod,
    onChange: onDateChanges,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
};

export default PeriodSelector;
