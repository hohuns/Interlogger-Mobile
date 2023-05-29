import axios from "axios";
import {
  Modal,
  TextArea,
  Button,
  Text,
  Input,
  Box,
  Pressable,
  HStack,
  Heading,
  Spinner,
} from "native-base";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hooks";

// Types
interface dialogDataProp {
  isOpen: boolean;
  onClose: () => void;
  messageRefetch: () => void;
}

type noteType = {
  id?: string;
  title?: string;
  text?: string;
  date?: string;
  logger?: string;
};

const Messagecreatedialog = ({
  isOpen,
  onClose,
  messageRefetch,
}: dialogDataProp) => {
  const [writrObject, setWriteObject] = useState<noteType>({
    id: "",
    title: "",
    text: "",
    date: "",
    logger: "",
  });
  const { t } = useTranslation("main");
  const [isSending, setIsSending] = useState<boolean>(false);
  const now = new Date();
  const reduxUserInfo = useAppSelector((state) => state.user?.user);
  //Handler
  const handleInputChange = (key: string, value: string) => {
    setWriteObject((prevState: noteType) => ({
      ...prevState,
      [key]: value,
    }));
  };

  //Button function
  const submitButtonHandler = async () => {
    let raw: noteType = {
      title: writrObject?.title,
      text: writrObject?.text,
      date: now.toLocaleString(),
      logger: reduxUserInfo,
    };
    setIsSending(true);
    setWriteObject({ id: "", title: "", text: "", date: "", logger: "" });
    if (!writrObject.title || !writrObject?.text) {
      alert(t(`message.required`));
    } else if (writrObject.title && writrObject?.text) {
      try {
        const data = await axios.post("firebaseURL...", JSON.stringify(raw), {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = data?.data;
        if (json?.name) {
          messageRefetch();
          alert(t(`message.success`));
          setIsSending(false);
          onClose();
        }
        setIsSending(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setIsSending(false);
          alert(t(`message.fail`));
        }
      }
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <Modal.Content>
          {isSending && (
            <HStack space={2} justifyContent="center">
              <Spinner accessibilityLabel="Loading posts" />
              <Heading color="white" fontSize="xl">
                {t(`message.sending`)}
              </Heading>
            </HStack>
          )}
          <Modal.CloseButton
            backgroundColor="transparent"
            borderColor="white"
            borderWidth="1"
          />
          <Modal.Header backgroundColor="#005885">
            {t(`message.header`)}
          </Modal.Header>
          <Modal.Body backgroundColor="#DDE6ED">
            <Text color="#526D82">{t(`message.title`)}</Text>
            <TextArea
              color="#526D82"
              borderColor="#27374D"
              autoCompleteType={true}
              defaultValue={writrObject?.title}
              // value={writrObject?.text}
              onChangeText={(text) => {
                handleInputChange("title", text);
              }}
            />
            <Text color="#526D82" mt={3}>
              {t(`message.text`)}
            </Text>
            <TextArea
              color="#526D82"
              borderColor="#27374D"
              autoCompleteType={true}
              defaultValue={writrObject?.text}
              // value={writrObject?.text}
              onChangeText={(text) => {
                handleInputChange("text", text);
              }}
            />
          </Modal.Body>
          <Modal.Footer backgroundColor="#005885">
            <Pressable onPress={submitButtonHandler} disabled={isSending}>
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
                    p={2}
                  >
                    <Text> {t(`SignInForm.button-submit`)}</Text>
                  </Box>
                );
              }}
            </Pressable>
            <Pressable onPress={onClose}>
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
                    ml={2}
                    p={2}
                  >
                    <Text> {t(`message.cancel`)}</Text>
                  </Box>
                );
              }}
            </Pressable>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default Messagecreatedialog;
