import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "./src/asset/theme";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Box, NativeBaseProvider } from "native-base";
import { Select } from "native-base";
import { useTranslation } from "react-i18next";
import "./src/Locales";
import HomeScreen from "./src/screens/Home";
import LoginScreen from "./src/screens/Login";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppSelector, useAppDispatch } from "./src/store/hooks";
import LogoutScreen from "./src/screens/Logout";
import SinginScreen from "./src/screens/Singin";
import MessagelogScreen from "./src/screens/Messagelog";
import ChangepasswordScreen from "./src/screens/Changepassword";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

// Types
type RootDrawerParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  LogoutScreen: undefined;
  SinginScreen: undefined;
  MessagelogScreen: undefined;
  ChangepasswordScreen: undefined;
};

// other library
const queryClient = new QueryClient();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

// notification
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function App() {
  const [lang, setLan] = useState<string>("");
  const { t, i18n } = useTranslation("main");
  const reduxIsLoggedIn: boolean = useAppSelector(
    (state) => state?.user?.isLoggedIn
  );

  const LanguageChangeHandler = (i: string) => {
    setLan(i);
    i18n.changeLanguage(i);
  };

  // notification
  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return;
        }
      });
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName="LoginScreen"
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#3399ff ",
                }, //all background
                headerTintColor: "white",
                sceneContainerStyle: {
                  backgroundColor: "#3399ff",
                }, // background of contents
                drawerContentStyle: { backgroundColor: "#3399ff" },
                drawerInactiveTintColor: "white",
                drawerActiveTintColor: "white",
                drawerActiveBackgroundColor: "#9999ff",
                headerRight: () => {
                  return (
                    <Box marginRight="2">
                      <Select
                        width="110"
                        borderColor="transparent"
                        selectedValue={lang}
                        accessibilityLabel="Languages"
                        placeholder="Languages"
                        placeholderTextColor="white"
                        dropdownIcon={
                          <Ionicons
                            name="chevron-down-outline"
                            size={20}
                            color="white"
                          />
                        }
                        onValueChange={(itemValue) =>
                          LanguageChangeHandler(itemValue)
                        }
                      >
                        <Select.Item label="한국어" value="kr" />
                        <Select.Item label="English" value="en" />
                      </Select>
                    </Box>
                  );
                },
              }}
            >
              {!reduxIsLoggedIn ? (
                <>
                  <Drawer.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ title: `${t("Layout.iconText-login")}` }}
                  />
                  <Drawer.Screen
                    name="SinginScreen"
                    component={SinginScreen}
                    options={{ title: `${t("Layout.iconText-signin")}` }}
                  />
                </>
              ) : (
                <>
                  <Drawer.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ title: `${t("Layout.iconText-home")}` }}
                  />
                  <Drawer.Screen
                    name="MessagelogScreen"
                    component={MessagelogScreen}
                    options={{ title: `${t("message.header")}` }}
                  />
                  <Drawer.Screen
                    name="ChangepasswordScreen"
                    component={ChangepasswordScreen}
                    options={{ title: `${t("Layout.iconText-changepw")}` }}
                  />
                  <Drawer.Screen
                    name="LogoutScreen"
                    component={LogoutScreen}
                    options={{ title: `${t("Layout.iconText-logout")}` }}
                  />
                </>
              )}
            </Drawer.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </QueryClientProvider>
    </>
  );
}

// Redux usage in app.tsx
export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
