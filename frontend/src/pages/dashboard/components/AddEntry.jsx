import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/react";
import { useEffect, useState } from "react";
import {
  InputBox,
  Button,
  SelectBox,
  showSuccess,
  showError,
  convertCurrency,
} from "../../../components";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createExpense } from "../../../api";
import { TYPES } from "../../../constants";
import { appStore, authStore } from "../../../store";
function AddEntry() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const GET_CATEGORY = appStore((state) => state.categories);
  const GET_CURRENCY = authStore((state) => state.user.currency);
  // const setLimit = appStore((state) => state.setLimit);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    onOpen();
  }, [onOpen]);
  const handleOpenChange = (open) => {
    if (!open) {
      navigate(-1);
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces")
      .min(3, "At least 3 characters")
      .max(30, "At most 30 characters")
      .required("Title is required"),

    amount: Yup.number()
      .typeError("Must be a number")
      .min(1, "At least 1")
      .max(100000, "Max 100000")
      .required("Amount is required"),

    description: Yup.string().when("category", (category, schema) => {
      if (category === "Others") {
        return schema
          .required("Description is required")
          .min(3, "At least 3 characters")
          .max(30, "At most 30 characters")
          .matches(
            /^[a-zA-Z0-9\s]+$/,
            "Only letters, numbers, and spaces allowed"
          );
      }
      return schema.notRequired();
    }),

    category: Yup.string().oneOf(GET_CATEGORY).required("Category is required"),

    type: Yup.string().oneOf(TYPES).required("Type is required"),
  });

  const handleCreate = async (values, { resetForm }) => {
    try {
      const convertedAmount = await convertCurrency(
        Number(values.amount),
        "INR",
        GET_CURRENCY
      );
      const payload = {
        title: values.title,
        amount: convertedAmount,
        category: values.category,
        description:
          values.category === "Others" ? values.description : undefined,
        type: values.type,
      };

      setLoading(true);
      const response = await createExpense(payload);
      const { message, statusCode, data } = response;
      if (statusCode === 201) {
        // setLimit(data?.limit);
        showSuccess(message);
      } else {
        showError(message);
      }
      resetForm();
      navigate(-1);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        className="dark:bg-[#000000] dark:border border-white"
      >
        <ModalContent className=" ">
          {() => (
            <>
              <ModalHeader>Add new Entry</ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={{
                    title: "",
                    amount: "",
                    category: "",
                    type: "",
                    description: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleCreate}
                >
                  {({ handleSubmit, values, setFieldValue }) => (
                    <>
                      <div className="flex flex-col mb-4 gap-6 w-full">
                        <div className="flex flex-col gap-2">
                          <InputBox name="title" label="Enter Title" />

                          <InputBox
                            name="amount"
                            label={`Enter Amount (${GET_CURRENCY})`}
                            type="number"
                          />
                          {values.category === "Others" && (
                            <InputBox
                              name="description"
                              label="Enter Description"
                              type="text"
                            />
                          )}
                        </div>
                        <div className="flex flex-col gap-6">
                          <SelectBox
                            label="Select Type"
                            value={values.type}
                            onChange={(e) =>
                              setFieldValue("type", e.target.value)
                            }
                            options={TYPES}
                          />
                          <SelectBox
                            label="Select Category"
                            value={values.category}
                            onChange={(e) =>
                              setFieldValue("category", e.target.value)
                            }
                            options={GET_CATEGORY}
                          />
                        </div>
                      </div>

                      <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="mb-2"
                      >
                        {loading ? "Loading..." : "Add New"}
                      </Button>
                    </>
                  )}
                </Formik>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddEntry;
