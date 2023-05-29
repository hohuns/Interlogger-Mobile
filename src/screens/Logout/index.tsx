import { Flex, HStack, Heading, Spinner, Text } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { usersActions } from "../../store/userSlice";
import { useAppDispatch } from "../../store/hooks";
import { DrawerScreenProps } from "@react-navigation/drawer";

// Types
type RootDrawerParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  LogoutScreen: undefined;
  SigninScreen: undefined;
  MessagelogScreen: undefined;
  ChangepasswordScreen: undefined;
};

type Props = DrawerScreenProps<RootDrawerParamList, "LogoutScreen">;

const Logout = ({ navigation }: Props) => {
  const { t } = useTranslation("main");
  const dispatch = useAppDispatch();

  //Logout user once user enter this components
  useEffect(() => {
    dispatch(usersActions.updateIdToken(""));
    dispatch(usersActions.updateIsLoggedIn(false));
    dispatch(usersActions.updateUser(""));
    navigation?.navigate("LogoutScreen" as never);
  }, []);

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
        justifyContent="center"
        alignItems="center"
      >
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {t(`Layout.iconText-logout`)}
          </Heading>
        </HStack>
      </Flex>
    </LinearGradient>
  );
};

export default Logout;
