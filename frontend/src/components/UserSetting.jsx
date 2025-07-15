import React, { useState } from "react";
import { Formik } from "formik";
import { authStore } from "../store";
import * as Yup from "yup";
import { InputBox, Button, showError, useHandleResponse } from "./index";
import { editUser, changePassword } from "../api";
const UserSetting = () => {
  const user = authStore((state) => state.user);
  const setUser = authStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const Response = useHandleResponse();
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Only alphabets and spaces are allowed")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name should not exceed 50 characters")
      .required("Name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    OldPassword: Yup.string()
      .matches(/^\d+$/, "Password must contain digits only")
      .min(5, "Password must be at least 5 characters")
      .max(10, "Password must not exceed 10 characters")
      .notRequired(),

    NewPassword: Yup.string().when("OldPassword", {
      is: (val) => val?.length > 0,
      then: (schema) =>
        schema
          .required("New Password is required")
          .matches(/^\d+$/, "Password must contain digits only")
          .min(5, "Password must be at least 5 characters")
          .max(10, "Password must not exceed 10 characters"),
      otherwise: (schema) => schema.notRequired(),
    }),

    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref("NewPassword"), null], "Passwords must match")
      .when("OldPassword", {
        is: (val) => val?.length > 0,
        then: (schema) =>
          schema
            .required("Confirm Password is required")
            .matches(/^\d+$/, "Password must contain digits only")
            .min(5, "Password must be at least 5 characters")
            .max(10, "Password must not exceed 10 characters"),
        otherwise: (schema) => schema.notRequired(),
      }),
  });

  const handleClick = async (values) => {
    if (loading) return;
    setLoading(true);

    try {
      const { name, email } = values;
      if (name !== user.name || email !== user.email) {
        const response = await editUser({ name, email });
        Response({ response });
        setUser({ ...user, name, email });
      }
      const { OldPassword, NewPassword, ConfirmPassword } = values;
      if (OldPassword && NewPassword && ConfirmPassword) {
        const response = await changePassword({ OldPassword, NewPassword });
        Response({ response });
      }
    } catch (error) {
      showError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1 className="text-xl font-semibold">User Settings</h1>
      <Formik
        initialValues={{
          name: user?.name || "",
          email: user?.email || "",
          OldPassword: "",
          NewPassword: "",
          ConfirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleClick}
      >
        {({ handleSubmit }) => (
          <>
            {/* 👤 Edit Profile */}
            <div className="w-[600px] flex flex-col gap-4 ">
              <div className="text-lg font-medium">👤 Edit Profile</div>
              <InputBox name="name" label="Enter Your Name" type="text" />
              <InputBox name="email" label="Enter Your Email" type="email" />
            </div>

            {/* 🔐 Change Password */}
            <div className="w-[600px] flex flex-col gap-4 ">
              <div className="text-lg font-medium">🔐 Change Password</div>
              <InputBox
                name="OldPassword"
                label="Enter Current Password"
                type="password"
              />
              <InputBox
                name="NewPassword"
                label="Enter New Password"
                type="password"
              />
              <InputBox
                name="ConfirmPassword"
                label="Enter Confirm Password"
                type="password"
              />
            </div>
            <Button onClick={handleSubmit} width="w-[600px]">
              {loading ? "Loading..." : "        Save Changes"}
            </Button>
          </>
        )}
      </Formik>
    </div>
  );
};

export default UserSetting;
