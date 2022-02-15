import { useContext } from 'react';
import PairStatsContext from 'contexts/PairStatsContext';
import dynamic from 'next/dynamic';

const RangePicker = dynamic(() => import('react-range-picker'), { ssr: false });

const RangeDatePicker = () => {
  const [
    { isLoadingPairChart, selectedPair },
    { updateChartDateRange },
  ] = useContext(PairStatsContext);
  const onDateChanges = (...params) => {
    if (params[0] && params[1]) {
      updateChartDateRange({
        from: params[0].getTime(),
        to: params[1].getTime(),
      });
    }
  };

  return (
    <>
      <RangePicker
        onDateSelected={onDateChanges}
        closeOnSelect
        closeOnOutsideClick
      />
      {isLoadingPairChart && <Spinner size="sm" />}
    </>
  );
};

export default RangeDatePicker;
