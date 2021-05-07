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
  Link,
  useToast
} from "@chakra-ui/react";
import api from "../Tools/api";
import { saveToken } from "../Tools/common";
import { apiSignInAction } from "../Tools/action";

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

const RegisterPage = props => {
  const username = useFormInput("");
  const password = useFormInput("");
  const email = useFormInput("");

  const toast = useToast();
  const handleSubmit = async () => {
    try {
      const requestSource = api.generateCancelToken();
      const values = {
        email: email.value,
        username: username.value,
        password: password.value
      };
      const response = await apiSignInAction(values, requestSource.token);
      const { data } = response;
      if (data.statusCode === 2000) {
        toast({
          title: data.message,
          description: data.message,
          status: data.statusCode,
          duration: 9000,
          isClosable: true
        });
      }
      api.setToken(data.data.type, data.data.token);
      saveToken(data.data.token);

      props.history.push("/login");
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
            // as="form"
            p={4}
            borderWidth="1px"
            rounded="lg"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            // onSubmit={handleSubmit}
          >
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...email} />
            </FormControl>
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
              // isLoading={props.isSubmitting}
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <FormControl>
              <FormHelperText>
                <Link as={LinkRouter} to="/login" color="teal.500" href="#">
                  Login
                </Link>
              </FormHelperText>
            </FormControl>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default RegisterPage;
