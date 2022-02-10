import { Box, Heading, Text, Image, Flex, HStack } from '@chakra-ui/react';

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
      <HStack>
        <img src="/icons/crypto/uni.svg" alt="next" />
        <Text as="h1" textStyle="title2" color="txt.primary">
          Uniswap v2 Stats
        </Text>
      </HStack>
    </Flex>
  );
};

export default Header;
