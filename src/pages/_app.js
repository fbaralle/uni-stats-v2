import { ChakraProvider } from '@chakra-ui/react';
import theme from 'components/theme';
import { PairStatsProvider } from 'contexts/PairStatsContext';

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <PairStatsProvider value={{}}>
        <Component {...pageProps} />
      </PairStatsProvider>
    </ChakraProvider>
  );
};

export default App;
