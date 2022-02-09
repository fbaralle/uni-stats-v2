import { ChakraProvider } from '@chakra-ui/react';
import Header from 'components/Header';
import theme from 'components/theme';

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
