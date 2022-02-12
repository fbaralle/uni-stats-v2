import { Box, Heading, Text, Image, Flex, HStack } from '@chakra-ui/react';

const Header = ({ children }) => {
  return (
    <Box
      backgroundColor="bg.primary"
      w="100%"
      maxH="80px"
      h="80px"
      px={6}
      py={4}
      borderBottom="1px solid"
      borderColor="border.decorative"
      position={'sticky'}
      top="0"
    >
      <HStack>
        <img src="/icons/crypto/uni.svg" alt="next" />
        <Text as="h1" textStyle="title2" color="txt.primary">
          Uniswap v2 Stats
        </Text>
      </HStack>
    </Box>
  );
};

export default Header;
