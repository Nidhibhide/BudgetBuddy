import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

const WarningModal = ({ data, onConfirm, onCancel }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    onOpen(); // Open modal on mount
  }, [onOpen]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>⚠️ Attention</ModalHeader>
            <ModalBody>
              <p className="text-sm text-gray-700">
                These categories are in use:
              </p>
              <ul className="list-disc pl-5 text-sm mt-2 text-gray-800">
                {Object.entries(data).map(([name, count]) => (
                  <li key={name}>
                    <strong>{name}</strong> – {count}{" "}
                    {count === 1 ? "record" : "records"}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-red-500 mt-3">
                Updating may affect records. Are you sure?
              </p>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="light"
                color="danger"
                onPress={() => {
                  onCancel?.();
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onConfirm?.();
                  onClose();
                }}
              >
                Continue
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default WarningModal;
