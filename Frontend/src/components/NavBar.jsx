import React from "react";
import {
  Box,
  Flex,
  Image,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Flex as={"nav"} w={"100%"} border={"2px solid red"}>
      <Box>
        <Image src="/images/brand_logo.png" />
      </Box>
      <HStack>
        <Link>HOME</Link>
        <Link>CONTACT</Link>
        <Link>ABOUT</Link>
        <Link>SERVICES</Link>
      </HStack>
    </Flex>
  );
}

export default Navbar;
