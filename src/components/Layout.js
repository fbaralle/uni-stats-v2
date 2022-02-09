import { Flex } from '@chakra-ui/react';

const Layout = ({ children, style }) => {
  return (
    <Flex
      backgroundColor="bg.page"
      w="100%"
      h="100%"
      px={6}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      {...style}
    >
      {children}
    </Flex>
  );
};

export default Layout;
