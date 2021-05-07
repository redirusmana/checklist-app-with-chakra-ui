import React, { useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import {
  Box,
  CSSReset,
  Heading,
  ThemeProvider,
  theme,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  Link
  // useToast
} from "@chakra-ui/react";
import api from "../Tools/api";
import { saveToken } from "../Tools/common";
import { apiLoginAction } from "../Tools/action";

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange
  };
};

const LoginPage = props => {
  const username = useFormInput("");
  const password = useFormInput("");

  const handleSubmit = async () => {
    try {
      const requestSource = api.generateCancelToken();
      const values = { username: username.value, password: password.value };
      const response = await apiLoginAction(values, requestSource.token);
      const { data } = response;
      // if (data.statusCode === 2110) {
      //   toast({
      //     title: data.message,
      //     description: data.message,
      //     status: data.statusCode,
      //     duration: 9000,
      //     isClosable: true
      //   });
      // }
      api.setToken(data.data.type, data.data.token);
      saveToken(data.data.token);
      props.history.push("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Box w={500} p={4} m="20px auto">
          <Heading as="h2" size="xl" textAlign="center" m={5}>
            Login Form
          </Heading>
          <Box
            p={4}
            borderWidth="1px"
            rounded="lg"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
          >
            }
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input type="text" {...username} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" {...password} />
            </FormControl>
            <Button
              mt={3}
              isFullWidth
              colorScheme="teal"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <FormControl>
              <FormHelperText>
                <Link as={LinkRouter} to="/register" color="teal.500" href="#">
                  Create New Account
                </Link>
              </FormHelperText>
            </FormControl>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default LoginPage;
