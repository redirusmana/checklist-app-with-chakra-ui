import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import {
  Box,
  CSSReset,
  ThemeProvider,
  theme,
  Flex,
  Text,
  Link,
  Button
} from "@chakra-ui/react";
import { removeToken } from "../Tools/common";

const Navbar = props => {
  const handleLogout = () => {
    removeToken();
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Flex
          bg="teal.200"
          w="100%"
          px={5}
          py={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex flexDirection="row" justifyContent="center" alignItems="center">
            <Text pl={3} color="white" fontWeight="bold">
              Apps
            </Text>
          </Flex>
          <Box>
            <Link
              m={2}
              as={LinkRouter}
              to="/dashboard"
              color="white"
              fontWeight="bold"
            >
              Dashboard
            </Link>
            <Link
              m={2}
              as={LinkRouter}
              to="/checklist"
              color="white"
              fontWeight="bold"
            >
              Checklist
            </Link>
            <Button
              m={2}
              size="sm"
              fontWeight="bold"
              onClick={() => handleLogout()}
              as={LinkRouter}
              to="/login"
            >
              Logout
            </Button>
          </Box>
        </Flex>
      </ThemeProvider>
    </div>
  );
};

export default Navbar;
