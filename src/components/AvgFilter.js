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
        textStyle={'body1'}
        fontSize={'sm'}
        borderWidth="1px"
        borderRadius="md"
        _checked={{
          bg: 'bg.muted',
          color: 'white',
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

const AverageFilter = () => {
  const [
    { averageFilterOptions, avgFilterSelected },
    { updateAverageFilter },
  ] = useContext(PairStatsContext);
  const onFilterChanges = (filter) => {
    updateAverageFilter(filter);
  };
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'filter',
    onChange: onFilterChanges,
    // defaultValue: avgFilterSelected,
    value: avgFilterSelected,
  });

  const group = getRootProps();
  return (
    <HStack {...group} value={avgFilterSelected}>
      {averageFilterOptions.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {`${value} hs`}
          </RadioCard>
        );
      })}
    </HStack>
  );
};

export default AverageFilter;
