import {
  Modal,
  TextArea,
  Button,
  Text,
  Input,
  Box,
  Pressable,
} from "native-base";
import { useTranslation } from "react-i18next";

// Types
interface dialogDataProp {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: noteType;
}

type noteType = {
  id?: string;
  title?: any;
  text?: any;
  date?: string;
};

const Viewdialog = ({ isOpen, onClose, selectedItem }: dialogDataProp) => {
  const { t } = useTranslation("main");
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <Modal.Content>
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
            <Input
              isReadOnly
              value={!selectedItem?.title ? "None" : selectedItem?.title}
              color="#526D82"
              borderColor="#27374D"
            />
            <Text color="#526D82" mt={3}>
              {t(`message.text`)}
            </Text>
            <TextArea
              isReadOnly
              value={!selectedItem?.text ? "None" : selectedItem?.text}
              color="#526D82"
              borderColor="#27374D"
              autoCompleteType={false}
            />
            <Text color="#526D82" mt={3}>
              {t(`message.date`)}
            </Text>
            <Input
              isReadOnly
              value={!selectedItem?.date ? "None" : selectedItem?.date}
              color="#526D82"
              borderColor="#27374D"
            />
          </Modal.Body>
          <Modal.Footer backgroundColor="#005885">
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

export default Viewdialog;
