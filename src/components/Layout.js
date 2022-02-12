import { Flex } from '@chakra-ui/react';

const Layout = ({ children, style }) => {
  return (
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
  );
};

export default Layout;
