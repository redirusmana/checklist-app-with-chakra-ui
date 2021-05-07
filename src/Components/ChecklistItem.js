import React, { useEffect, useState } from "react";
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
  Badge,
  Checkbox,
  Spinner,
  Text
} from "@chakra-ui/react";
import api from "../Tools/api";
import Navbar from "./Navbar";
import {
  apiChecklistGet,
  apiItemStore,
  apiItemDelete,
  apiItemShow,
  apiItemPutRename,
  apiItemPutStatus
} from "../Tools/action";
import { getSavedToken } from "../Tools/common";

const ChecklistItem = props => {
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(false);
  const [dataChecklist, setDataChecklist] = useState([]);
  const [detailItem, setDetailItem] = useState([]);
  const initialFormState = { itemName: "", id: null };
  const [itemName, setItemName] = useState(initialFormState);

  const requestOption = {
    headers: { Authorization: `Bearer ${getSavedToken()}` }
  };

  const getItemIndex = async () => {
    setLoading(true);
    try {
      const { match } = props;
      const requestSource = api.generateCancelToken();
      const response = await apiChecklistGet(requestSource.token, {
        ...requestOption
      });
      const temp = response.data.data;
      setDataChecklist(
        temp.filter(check => check.id === parseInt(match.params.id))
      );
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const ItemStore = async () => {
    setLoading(true);
    try {
      const { match } = props;
      const requestSource = api.generateCancelToken();
      const values = {
        itemName: itemName.itemName,
        checklistId: match.params.id
      };
      const response = await apiItemStore(values, requestSource.token, {
        ...requestOption
      });
      getItemIndex(response);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const ItemShow = async id => {
    try {
      // const { match, history } = props;
      const requestSource = api.generateCancelToken();
      const response = await apiItemShow(
        `${id}`,
        requestSource.token,
        requestOption
      );
      setDetailItem(response.data.data);
      // history.push(`/checklist/${match.params.id}/item/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const ItemUpdateStatus = async id => {
    setLoading(true);
    try {
      const requestSource = api.generateCancelToken();
      const response = await apiItemPutStatus(
        `${id}`,
        requestSource.token,
        requestOption
      );
      getItemIndex(response);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const ItemDelete = async id => {
    try {
      const requestSource = api.generateCancelToken();
      const response = await apiItemDelete(
        `${id}`,
        requestSource.token,
        requestOption
      );
      console.log(response);
      setDataChecklist(dataChecklist[0].items.filter(item => item.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = async id => {
    try {
      setEditable(true);
      const requestSource = api.generateCancelToken();
      const response = await apiItemShow(
        `${id}`,
        requestSource.token,
        requestOption
      );
      const { data } = response;
      setItemName({ itemName: data.data.name, id: id });
    } catch (e) {
      console.log(e);
    }
  };
  const handleCancel = () => {
    setEditable(false);
    setItemName({ itemName: "", id: null });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setItemName({ ...itemName, [name]: value });
  };

  const ItemUpdateRename = async () => {
    try {
      setLoading(true);
      const { match } = props;
      const requestSource = api.generateCancelToken();
      const values = {
        itemName: itemName.itemName,
        checklistId: match.params.id
      };
      const response = await apiItemPutRename(
        values,
        itemName.id,
        requestSource.token,
        requestOption
      );
      setLoading(false);
      getItemIndex(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getItemIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Navbar />
        <Center>
          <Heading size="lg" fontSize="30px" mt="4">
            Checklist Item Table
          </Heading>
        </Center>
        <Grid templateColumns="repeat(4, 1fr)" gap={4} w={800} px={0} m="auto">
          <GridItem colSpan={3} pr="10px">
            <FormControl id="checklist">
              <FormLabel>Checklist</FormLabel>
              <Input
                type="text"
                name="itemName"
                value={itemName.itemName}
                onChange={handleInputChange}
                size="sm"
                borderRadius="5px"
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormLabel />
            <FormControl size="small ">
              {editable ? (
                <React.Fragment>
                  <Button
                    mt={6}
                    size="sm"
                    w={20}
                    mr={4}
                    colorScheme="teal"
                    onClick={ItemUpdateRename}
                  >
                    Update
                  </Button>
                  <Button
                    mt={6}
                    w={20}
                    size="sm"
                    colorScheme="red"
                    onClick={handleCancel}
                  >
                    cancel
                  </Button>
                </React.Fragment>
              ) : (
                <Button
                  mt={6}
                  isFullWidth
                  size="sm"
                  colorScheme="teal"
                  onClick={ItemStore}
                >
                  Submit
                </Button>
              )}
            </FormControl>
          </GridItem>
        </Grid>
        <Box w={800} p={3} m="20px auto" borderWidth="1px" borderRadius="lg">
          <Table variant="striped" colorScheme="teal">
            <TableCaption>List Of Checklist</TableCaption>
            <Thead>
              <Tr>
                <Th>Check</Th>
                <Th>No</Th>
                <Th>Id</Th>
                <Th>Nama</Th>
                <Th>Status</Th>
                <Th>Item</Th>
              </Tr>
            </Thead>
            {!loading ? (
              <Tbody>
                {dataChecklist[0] &&
                Array.isArray(dataChecklist[0].items) &&
                dataChecklist[0].items.length > 0
                  ? dataChecklist[0].items.map((item, index) => {
                      return (
                        <Tr key={item.id}>
                          <Td>
                            <Checkbox
                              borderColor="green"
                              onChange={() => ItemUpdateStatus(item.id)}
                              isChecked={item.itemCompletionStatus}
                              // colorScheme="green"
                            />
                          </Td>
                          <Td>{index + 1}</Td>
                          <Td>{item.id}</Td>
                          <Td>{item.name}</Td>
                          <Td>
                            {item.itemCompletionStatus ? (
                              <Badge colorScheme="green">Done</Badge>
                            ) : (
                              <Badge colorScheme="red">unDone</Badge>
                            )}
                          </Td>
                          <Td>
                            <Button
                              size="sm"
                              colorScheme="green"
                              onClick={() => handleEdit(item.id)}
                              mr="2"
                            >
                              Rename
                            </Button>
                            <Button
                              size="sm"
                              colorScheme="blue"
                              mr="2"
                              onClick={() => ItemShow(item.id)}
                            >
                              Detail
                            </Button>
                            <Button
                              size="sm"
                              colorScheme="red"
                              onClick={() => ItemDelete(item.id)}
                            >
                              Delete
                            </Button>
                          </Td>
                        </Tr>
                      );
                    })
                  : []}
              </Tbody>
            ) : (
              <React.Fragment>
                {/* <Box margin="150% 250%">
                  <Spinner
                    thickness="5px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="green.500"
                    size="xl"
                  />
                </Box> */}
              </React.Fragment>
            )}
          </Table>
        </Box>
        <Box w={800} p={3} m="20px auto">
          <Center>
            <Heading size="lg" fontSize="30px" mt="3">
              Detail Item
            </Heading>
          </Center>
          {detailItem ? (
            <React.Fragment>
              <Text>Id : {detailItem.id ? detailItem.id : ""}</Text>
              <Text>Name : {detailItem.name ? detailItem.name : "ss"}</Text>
              <Text>
                Status :{" "}
                {detailItem.itemCompletionStatus ? (
                  <Badge colorScheme="green">Done</Badge>
                ) : (
                  <Badge colorScheme="red">unDone</Badge>
                )}
              </Text>
            </React.Fragment>
          ) : (
            <Text>Empty</Text>
          )}
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default ChecklistItem;
