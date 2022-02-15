import { Flex, Text, Link, HStack } from '@chakra-ui/react';
import Header from 'components/Header';

const Footer = ({ children, style }) => {
  return (
    <Flex
      w="100%"
      mt={6}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      color="txt.muted"
      fontSize="sm"
    >
      <Text>Developed by Francisco Baralle on February, 2022.</Text>
      <Text>© Copyright. All rights reserved</Text>
      <HStack color="bg.muted" mt={3}>
        <Link href="https://github.com/fbaralle">
          <img
            src="/icons/github.svg"
            alt="next"
            width={35}
            class="commonSvg"
            color="bg.muted"
          />
        </Link>
        <Link href="https://www.linkedin.com/in/francisco-baralle/">
          <img
            src="/icons/linkedin.svg"
            alt="next"
            width={35}
            class="commonSvg"
            color="bg.muted"
          />
        </Link>
      </HStack>
    </Flex>
  );
};

export default Footer;
