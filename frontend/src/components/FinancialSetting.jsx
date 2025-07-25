import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  InputBox,
  Button,
  showError,
  useHandleResponse,
  MultiSelect,
  WarningModal,
  getDiffCategories,
} from "./index";
import { createCategory, editbudget, getCount, softdelete } from "../api";

import { appStore } from "../store";
import { CATEGORIES, CATEGORY_LIST } from "../../../shared/constants";

const FinancialSetting = () => {
  const [loading, setLoading] = useState(false);
  const setCategories = appStore((state) => state.setCategories);
  const [showModal, setShowModal] = useState(false);
  const [deletedCategories, setDeletedCategories] = useState([]);
  const [newCategories, setNewCategories] = useState([]);
  const [data, setData] = useState(null);
  const setLimit = appStore((state) => state.setLimit);
  const categories = appStore((state) => state.categories);
  const limit = appStore((state) => state.limit);
  const Response = useHandleResponse();
  const validationSchema = Yup.object().shape({
    limit: Yup.number()
      .required("Budget limit is required")
      .min(1, "Limit must be greater than 0"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { names: updatedCategories, limit: newLimit } = values;
      // Update budget limit if changed
      if (Number(newLimit) !== Number(limit)) {
        const res = await editbudget({ limit: Number(newLimit) });
        setLimit(newLimit);
        Response({ response: res });
      }

      if (
        updatedCategories.length !== categories.length ||
        !updatedCategories.every((name) => categories.includes(name))
      ) {
        const { added: addedCategories, removed: removedCategories } =
          getDiffCategories(categories, updatedCategories);

        setDeletedCategories(removedCategories);
        setNewCategories(updatedCategories);
        const res = await getCount(removedCategories);
        if (res?.statusCode === 200) {
          const hasRecords = Object.values(res?.data).some(
            (count) => count !== 0
          );
          if (hasRecords) {
            setData(res.data);
            setShowModal(true);
          }
          return;
        }
      }
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleModalConfirm = async () => {
    try {
      let res;
      if (deletedCategories.length > 0) {
        res = await softdelete({ categories: deletedCategories });
      }

      const response = await createCategory({ names: newCategories });
      setCategories(newCategories);
      Response({ response });
    } catch (error) {
      showError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1 className="text-xl font-semibold">Financial Settings</h1>

      <Formik
        initialValues={{
          limit: limit ?? "",
          names: categories.length > 0 ? categories : CATEGORIES,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="w-[600px] flex flex-col gap-4">
            <MultiSelect
              label="Select Categories"
              options={CATEGORY_LIST}
              selected={values.names}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 4) {
                  setFieldValue("names", value);
                }
              }}
            />
            <InputBox
              name="limit"
              label="Set Your Budget Limit"
              type="number"
            />

            <Button width="w-full">
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          </Form>
        )}
      </Formik>
      {showModal && data && (
        <WarningModal
          data={data}
          onConfirm={handleModalConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default FinancialSetting;
