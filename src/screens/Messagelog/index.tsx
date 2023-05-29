/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Flex,
  Text,
  Button,
  HStack,
  Heading,
  Spinner,
  Pressable,
  Box,
  FlatList,
  Spacer,
  VStack,
  Center,
} from "native-base";
import { useState } from "react";
import axios from "axios";
import { useQueryHeaderFetchHooks } from "../../hooks/useQueryFetchHooks";
import { Divider } from "native-base";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { useAppSelector } from "../../store/hooks";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { AntDesign } from "@expo/vector-icons";
import Viewdialog from "../Viewdialog";
import Messagecreatedialog from "../Messagecreatedialog";

// Types
type RootDrawerParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  LogoutScreen: undefined;
  SigninScreen: undefined;
  MessagelogScreen: undefined;
  ChangepasswordScreen: undefined;
};

type noteType = {
  id?: string;
  title?: any;
  text?: any;
  date?: string;
};

type Props = DrawerScreenProps<RootDrawerParamList, "MessagelogScreen">;

const Messagelog = ({ route, navigation }: Props) => {
  const [tempData, setTempData] = useState<noteType[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalVisibleCreate, setModalVisibleCreate] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<noteType>();
  const reduxUser = useAppSelector((state) => state?.user?.user);
  const { t } = useTranslation("main");
  const onClose = () => {
    setModalVisible(false);
  };
  const onCloseCreate = () => {
    setModalVisibleCreate(false);
  };
  // Fetching functions
  const getRawDataSource = async () => {
    const data = await axios.get("firebaseURL...");
    const json = data.data;
    return json;
  };

  // React query
  const onSuccess = (data: any) => {
    console.log("Sucess", data);
    const loadedNotes: { id: string; title: any; text: any; date: string }[] =
      [];
    for (const key in data) {
      loadedNotes.push({
        id: key,
        title: data[key].title,
        text: data[key].text,
        date: `${data[key].logger} logged message at ${data[key].date}..`,
      });
    }
    loadedNotes.reverse();
    setTempData(loadedNotes);
  };

  const {
    data: messageView,
    isFetching,
    isError,
    refetch: messageRefetch,
  } = useQueryHeaderFetchHooks(
    300000,
    true,
    "messageView",
    5000,
    true,
    getRawDataSource,
    onSuccess
  );

  return (
    <>
      <LinearGradient
        style={{ flex: 1 }}
        colors={["#3399ff", "#9999ff"]}
        start={[0.0, 0.27]}
        end={[0.0, 1.0]}
        locations={[0.0, 1.0]}
      >
        <Flex
          direction="column"
          flex="1"
          justifyContent="center"
          alignItems="center"
          borderTopColor="white"
          borderTopWidth="1"
        >
          {isFetching ? (
            <HStack space={2} justifyContent="center">
              <Spinner accessibilityLabel="Loading posts" />
              <Heading color="white" fontSize="xl">
                {t(`message.loading`)}
              </Heading>
            </HStack>
          ) : (
            <>
              <Flex flex="1">
                <Flex flexDirection="column" mt={3}>
                  <Text fontSize="md" color="white">
                    {t(`welcome.header`)} {reduxUser}
                  </Text>
                  <Flex
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Pressable onPress={() => messageRefetch()} mb={2}>
                      {({ isHovered, isFocused, isPressed }: any) => {
                        return (
                          <Box
                            bg={isPressed ? "#8190b1" : "transparent"}
                            style={{
                              transform: [
                                {
                                  scale: isPressed ? 0.97 : 1,
                                },
                              ],
                            }}
                            rounded="8"
                            overflow="hidden"
                            borderWidth="1"
                            borderColor="coolGray.300"
                            maxW="96"
                            mt={3}
                            p={2}
                          >
                            <Text>{t(`message.refresh`)}</Text>
                          </Box>
                        );
                      }}
                    </Pressable>
                    <Pressable
                      onPress={() => setModalVisibleCreate(true)}
                      mb={2}
                      ml={3}
                    >
                      {({ isHovered, isFocused, isPressed }: any) => {
                        return (
                          <Box
                            bg={isPressed ? "#8190b1" : "transparent"}
                            style={{
                              transform: [
                                {
                                  scale: isPressed ? 0.97 : 1,
                                },
                              ],
                            }}
                            rounded="8"
                            overflow="hidden"
                            borderWidth="1"
                            borderColor="coolGray.300"
                            maxW="96"
                            mt={3}
                            p={2}
                          >
                            <Text>{t(`message.write`)}</Text>
                          </Box>
                        );
                      }}
                    </Pressable>
                  </Flex>
                </Flex>
              </Flex>
              <Flex flex="9" width="100%">
                <Box>
                  <Heading fontSize="xl" p="2" color="white" mt={5}>
                    {t(`message.header`)}
                  </Heading>
                  <Divider my="2" bg="white" />
                  {tempData?.length === 0 ? (
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                      mt={10}
                    >
                      <Text>{t(`message.empty`)}</Text>
                    </Flex>
                  ) : (
                    <FlatList
                      data={tempData}
                      marginBottom={20}
                      renderItem={({ item }) => (
                        <Pressable
                          onPress={() => {
                            setSelectedItem(item);
                            setModalVisible(true);
                          }}
                        >
                          {({ isHovered, isFocused, isPressed }: any) => {
                            return (
                              <Box
                                bg={isPressed ? "#9999ff" : "transparent"}
                                style={{
                                  transform: [
                                    {
                                      scale: isPressed ? 0.97 : 1,
                                    },
                                  ],
                                }}
                                p={7}
                                rounded="8"
                                borderWidth="1"
                                borderColor="white"
                                m={3}
                              >
                                <Flex
                                  justifyContent="space-around"
                                  alignItems="center"
                                  flexDirection="row"
                                >
                                  <Flex>
                                    <Text textAlign="center">
                                      <AntDesign
                                        name="message1"
                                        size={20}
                                        color="white"
                                      />
                                    </Text>
                                  </Flex>
                                  <Flex
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    marginLeft={10}
                                  >
                                    <Text color="white">{item?.title}</Text>
                                    <Text
                                      fontSize="xs"
                                      color="white"
                                      textAlign="center"
                                    >
                                      {item?.date}
                                    </Text>
                                  </Flex>
                                </Flex>
                              </Box>
                            );
                          }}
                        </Pressable>
                      )}
                      keyExtractor={(item) => item?.id as string}
                    />
                  )}
                </Box>
              </Flex>
            </>
          )}
        </Flex>
        <Viewdialog
          isOpen={modalVisible}
          onClose={onClose}
          selectedItem={selectedItem!}
        />
        <Messagecreatedialog
          isOpen={modalVisibleCreate}
          onClose={onCloseCreate}
          messageRefetch={messageRefetch}
        />
      </LinearGradient>
    </>
  );
};

export default Messagelog;
