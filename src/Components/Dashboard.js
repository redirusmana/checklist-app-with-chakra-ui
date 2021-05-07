import React from "react";
import {
  CSSReset,
  ThemeProvider,
  theme,
  Heading,
  Image,
  Center,
  Text
} from "@chakra-ui/react";
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Navbar />
        <Heading size="lg" fontSize="30px" my="3">
          <Center>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/220px-React-icon.svg.png"
              width="300px"
              size={10}
            />
          </Center>
          <Text textAlign="center">Welcome to Dashboard</Text>
        </Heading>
      </ThemeProvider>
    </div>
  );
};

export default Dashboard;
