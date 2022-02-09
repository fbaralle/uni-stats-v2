import { Box, Heading, Text, Image, Flex } from '@chakra-ui/react';

const Header = ({ children }) => {
  return (
    <Flex
      backgroundColor="bg.primary"
      w="100%"
      flex={1}
      px={6}
      py={4}
      borderBottom="1px solid"
      borderColor="border.decorative"
    >
      <Text as="h1" textStyle="title2" color="txt.primary">
        Uniswap v2 Stats
      </Text>
    </Flex>
  );
};

export default Header;
