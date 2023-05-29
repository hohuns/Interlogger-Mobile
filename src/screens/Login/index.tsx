import { Box, Center, Flex, Input, Text, Pressable } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import axios from "axios";
import { usersActions } from "../../store/userSlice";
import { useAppDispatch } from "../../store/hooks";
import { DrawerScreenProps } from "@react-navigation/drawer";
import * as Notifications from "expo-notifications";

// Types
interface loginType {
  id: string;
  pd: string;
}

// Types
type RootDrawerParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  LogoutScreen: undefined;
  SigninScreen: undefined;
  MessagelogScreen: undefined;
  ChangepasswordScreen: undefined;
};

type Props = DrawerScreenProps<RootDrawerParamList, "LoginScreen">;

const Login = ({ navigation }: Props) => {
  const [loginObject, setLoginObject] = useState<loginType>({ id: "", pd: "" });
  const { t } = useTranslation("main");
  const dispatch = useAppDispatch();

  //Handler
  const handleInputChange = (key: string, value: string) => {
    setLoginObject((prevState: loginType) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const loginButtonHandler = async () => {
    let raw = {
      email: loginObject?.id,
      password: loginObject?.pd,
      returnSecureToken: true,
    };
    try {
      const data = await axios.post("firebaseURL...", raw, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = data?.data;
      if (json?.idToken) {
        dispatch(usersActions.updateIdToken(json.idToken));
        dispatch(usersActions.updateIsLoggedIn(true));
        dispatch(usersActions.updateUser(json?.displayName));
        navigation?.navigate("HomeScreen" as never);
        setLoginObject({ id: "", pd: "" });
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Check Logs!",
            body: "Someone else might have written the message...! Make sure to check it out!",
          },
          trigger: {
            seconds: 60, //onPress가 클릭이 되면 60초 뒤에 알람이 발생합니다.
          },
        });
        alert(`${t(`Loginform.success`)} ${json?.displayName}..!`);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(t(`error.error`));
      }
    }
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#3399ff", "#9999ff"]}
      start={[0.0, 0.27]}
      end={[0.0, 1.0]}
      locations={[0.0, 1.0]}
    >
      <Flex
        borderTopColor="white"
        borderTopWidth="1"
        flex="1"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="column"
        p={3}
      >
        <Center
          borderColor="white"
          borderWidth="1"
          borderRadius="8"
          flexDirection="column"
          w="100%"
          minHeight={200}
          maxHeight={250}
          mt={30}
        >
          <Text fontSize="md" mt={2}>
            {t(`Loginform.header`)}
          </Text>
          <Box w="100%" maxWidth="300px" mt={3}>
            <Text>{t(`Loginform.input-email`) as string}</Text>
            <Input
              type="text"
              placeholder={t(`Loginform.input-email`) as string}
              placeholderTextColor="white"
              color="white"
              borderColor="white"
              focusOutlineColor="primary.900"
              isRequired
              value={loginObject?.id}
              onChangeText={(text) => {
                handleInputChange("id", text);
              }}
            />
          </Box>
          <Box w="100%" maxWidth="300px" mt={3}>
            <Text>{t(`Loginform.input-pd`) as string}</Text>
            <Input
              type="password"
              placeholder={t(`Loginform.input-pd`) as string}
              placeholderTextColor="white"
              color="white"
              borderColor="white"
              focusOutlineColor="primary.900"
              isRequired
              value={loginObject?.pd}
              onChangeText={(text) => {
                handleInputChange("pd", text);
              }}
            />
          </Box>
          <Pressable onPress={loginButtonHandler} mb={2}>
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
                  <Text>{t(`SignInForm.button-submit`)}</Text>
                </Box>
              );
            }}
          </Pressable>
        </Center>
      </Flex>
    </LinearGradient>
  );
};

export default Login;
