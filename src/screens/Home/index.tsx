import { Flex, Text, Center, Image, Box, Pressable } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import img1 from "../../asset/images/img1.jpg";
import img2 from "../../asset/images/img2.jpg";
import img3 from "../../asset/images/img3.jpg";
import { useAppSelector } from "../../store/hooks";
import { DrawerScreenProps } from "@react-navigation/drawer";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions, View } from "react-native";

type RootDrawerParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  LogoutScreen: undefined;
  SigninScreen: undefined;
  MessagelogScreen: undefined;
  ChangepasswordScreen: undefined;
};
type Props = DrawerScreenProps<RootDrawerParamList, "HomeScreen">;

const Home = ({ navigation }: Props) => {
  const { t } = useTranslation("main");
  const reduxUser: string = useAppSelector((state) => state?.user?.user);
  const reduxIsLoggedIn: boolean = useAppSelector(
    (state) => state?.user?.isLoggedIn
  );
  const width = Dimensions.get("window").width;
  const images = [img1, img2, img3];

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
        flexDirection="column"
      >
        <Center>
          <Text fontSize="xl" fontWeight="light">
            {t(`welcome.header`)} {reduxUser}
          </Text>
          <Text fontSize="md" fontWeight="light">
            {t(`InitialPage.header`)}
          </Text>
        </Center>
        <Center>
          <Carousel
            loop
            width={width}
            height={width}
            autoPlay={true}
            data={images}
            scrollAnimationDuration={1000}
            mode="parallax"
            renderItem={({ index, item }) => (
              <Image
                source={item}
                rounded="5"
                alt="pic"
                width="100%"
                height="100%"
                resizeMode="cover"
              />
            )}
          />
        </Center>
        <Pressable
          onPress={() => navigation?.navigate("MessagelogScreen" as never)}
          mb={2}
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
                mt={5}
                p={2}
              >
                <Text>{t(`message.write`)}</Text>
              </Box>
            );
          }}
        </Pressable>
      </Flex>
    </LinearGradient>
  );
};

export default Home;
