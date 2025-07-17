import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore, appStore } from "../../../store";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { logout } from "../../../api";

const Logout = () => {
  const auth = authStore((state) => state.logout);
  const app = appStore((state) => state.logout);
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const handleConfirm = async (onClose) => {
    try {
      const response = await logout();
      auth();
      app();
      const { message, statusCode } = response;
      if (statusCode === 200) {
        onClose();
        navigate("/");
      } else {
        showError(message);
        onClose();
        setTimeout(() => navigate("/dashboard/home"), 3000);
      }
    } catch (error) {
      showError(error.message);
    }
  };
  const handleCancel = (onClose) => {
    onClose();
    navigate("/dashboard/home");
  };
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirm LogOut</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to exist the application ?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    handleCancel(onClose);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleConfirm(onClose);
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Logout;
