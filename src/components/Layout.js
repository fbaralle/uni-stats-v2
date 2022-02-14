import { Flex } from '@chakra-ui/react';
import Header from 'components/Header';

const Layout = ({ children, style }) => {
  return (
    <Flex
      h="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Header />
      <Flex
        backgroundColor="bg.page"
        w="100%"
        flex={1}
        p={6}
        flexDirection="column"
        alignItems="center"
        justifyContent="start"
        overflow={'scroll'}
        {...style}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;
