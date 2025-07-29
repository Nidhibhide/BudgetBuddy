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
  convertCurrency,
} from "./index";
import {
  createCategory,
  editbudget,
  getCount,
  softdelete,
  restoredelete,
} from "../api";

import { appStore, authStore } from "../store";
import { CATEGORIES, CATEGORY_LIST } from "../constants";

const FinancialSetting = () => {
  const [loading, setLoading] = useState(false);
  const setCategories = appStore((state) => state.setCategories);
  const GET_CURRENCY = authStore((state) => state.user.currency);
  const [showModal, setShowModal] = useState(false);
  const [deletedCategories, setDeletedCategories] = useState([]);
  const [newCategories, setNewCategories] = useState([]);
  const [data, setData] = useState(null);
  const setLimit = appStore((state) => state.setLimit);
  const categories = appStore((state) => state.categories);
  const limit = appStore((state) => state.limit);
  const Response = useHandleResponse();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { names: updatedCategories, limit: newLimit } = values;

      // Convert limit to INR for storage
      const convertedLimitToINR = await convertCurrency(
        Number(newLimit),
        "INR",
        GET_CURRENCY
      );

      if (Number(newLimit) !== Number(limit)) {
        const res = await editbudget({ limit: convertedLimitToINR });
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
          setData(res.data);
          setShowModal(true);
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
      if (newCategories.length > 0) {
        res = await restoredelete({ categories: newCategories });
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
              label={`Set Your Budget Limit (in ${GET_CURRENCY})`}
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
