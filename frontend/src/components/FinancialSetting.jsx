import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  InputBox,
  Button,
  showError,
  useHandleResponse,
  MultiSelect,
} from "./index";
import { createCategory, editbudget } from "../api";

import { appStore } from "../store";
import { CATEGORY_LIST } from "../../../shared/constants";

const FinancialSetting = () => {
  const [loading, setLoading] = useState(false);
  const setCategories = appStore((state) => state.setCategories);
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
      const { names, limit: newLimit } = values;
      if (Number(newLimit) !== Number(limit)) {
        const response = await editbudget({ limit: Number(newLimit) });
        setLimit(newLimit);
        Response({ response });
      }

      if (
        names.length !== categories.length ||
        !names.every((name) => categories.includes(name))
      ) {
        const response = await createCategory({ names });
        setCategories(names);
        Response({ response });
      }
    } catch (err) {
      showError("Failed to save changes");
    } finally {
      setLoading(false);
    }
  };
//   const handleSubmit = async (values) => {
//   try {
//     setLoading(true);
//     const { names: newCategories, limit: newLimit } = values;

//     // Update budget limit if changed
//     if (Number(newLimit) !== Number(limit)) {
//       const res = await editbudget({ limit: Number(newLimit) });
//       setLimit(newLimit);
//       Response({ response: res });
//     }

//     // Find new categories (max 4)
//     const addedCategories = newCategories.filter(
//       (name) => !categories.includes(name)
//     );

//     if (addedCategories.length > 0) {
//       // Get and delete records for each new category
//       for (const category of addedCategories) {
//         const { data = [] } = await getAllByCategory(category);
//         if (data.length > 0) {
//           await deleteByCategory(category);
//         }
//       }

//       // Update the category list
//       const res = await createCategory({ names: newCategories });
//       setCategories(newCategories);
//       Response({ response: res });
//     }

//   } catch (error) {
//     showError("Failed to save changes");
//   } finally {
//     setLoading(false);
//   }
// };


  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1 className="text-xl font-semibold">Financial Settings</h1>

      <Formik
        initialValues={{
          limit: limit || "",
          names: categories || [],
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
    </div>
  );
};

export default FinancialSetting;
