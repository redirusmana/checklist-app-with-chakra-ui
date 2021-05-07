import React, { useEffect, useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import {
  CSSReset,
  ThemeProvider,
  theme,
  Heading,
  Box,
  Table,
  TableCaption,
  Tr,
  Td,
  Tbody,
  Thead,
  Th,
  Center,
  Grid,
  GridItem,
  FormLabel,
  FormControl,
  Input,
  Button,
  Link,
  Badge,
  Spinner
} from "@chakra-ui/react";
import api from "../Tools/api";
import Navbar from "./Navbar";
import {
  apiChecklistGet,
  apiChecklistStore,
  apiChecklistDelete
} from "../Tools/action";
import { getSavedToken } from "../Tools/common";
import { useFormInput } from "../Tools/funcs";

const Checklist = () => {
  const [loading, setLoading] = useState(true);
  const [dataChecklist, setDataChecklist] = useState([]);
  const name = useFormInput("");

  const requestOption = {
    headers: { Authorization: `Bearer ${getSavedToken()}` }
  };

  const getChecklistIndex = async () => {
    setLoading(true);
    try {
      const requestSource = api.generateCancelToken();
      const response = await apiChecklistGet(requestSource.token, {
        ...requestOption
      });
      setDataChecklist(response.data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const requestSource = api.generateCancelToken();
      const values = { name: name.value };
      const response = await apiChecklistStore(
        values,
        requestSource.token,
        requestOption
      );
      setDataChecklist([...dataChecklist, response.data.data]);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async id => {
    setLoading(true);
    try {
      const requestSource = api.generateCancelToken();
      const response = await apiChecklistDelete(
        `${id}`,
        requestSource.token,
        requestOption
      );
      console.log(response);
      setDataChecklist(dataChecklist.filter(check => check.id !== id));
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getChecklistIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Navbar />
        <Center>
          <Heading size="lg" fontSize="30px" mt="4">
            Checklist Table
          </Heading>
        </Center>
        <Grid templateColumns="repeat(4, 1fr)" gap={4} w={600} px={0} m="auto">
          <GridItem colSpan={3} pr="10px">
            <FormControl id="checklist">
              <FormLabel>Checklist</FormLabel>
              <Input type="text" {...name} size="sm" borderRadius="5px" />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormLabel />
            <FormControl size="small ">
              <Button
                mt={6}
                isFullWidth
                size="sm"
                colorScheme="teal"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </FormControl>
          </GridItem>
        </Grid>
        <Box w={600} m="20px auto" borderWidth="1px" borderRadius="lg">
          <Table variant="striped" colorScheme="teal">
            <TableCaption>List Of Checklist</TableCaption>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Id</Th>
                <Th>Nama</Th>
                <Th>Status</Th>
                <Th>Item</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {!loading ? (
                dataChecklist.map((check, index) => {
                  return (
                    <Tr key={check.id}>
                      <Td>{index + 1}</Td>
                      <Td>{check.id}</Td>
                      <Td>{check.name}</Td>
                      <Td>
                        {check.checklistCompletionStatus ? (
                          <Badge colorScheme="green">Done</Badge>
                        ) : (
                          <Badge colorScheme="red">unDone</Badge>
                        )}
                      </Td>
                      <Td>
                        <Button size="sm" colorScheme="blue">
                          <Link as={LinkRouter} to={`/checklist/${check.id}`}>
                            Detail
                          </Link>
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDelete(check.id)}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  );
                })
              ) : (
                <React.Fragment>
                  <Box margin="150% 315%">
                    <Spinner
                      thickness="5px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="green.500"
                      size="xl"
                    />
                  </Box>
                </React.Fragment>
              )}
            </Tbody>
          </Table>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Checklist;
