import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputField } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../../api/user";
import { showError, showSuccess } from "../../../components/ToastUtil";
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Only alphabets and spaces are allowed")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name should not exceed 50 characters")
      .required("Name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string()
      .matches(/^\d+$/, "Password must contain digits only")
      .min(5, "Password must be at least 5 characters")
      .max(10, "Password must not exceed 10 characters")
      .required("Password is required"),
  });
  // handle sign up
  const handleSignUp = async (values, { resetForm }) => {
    try {
      if (loading) return;
      setLoading(true);
      const response = await signup(values);
      const { message, statusCode } = response;

      if (statusCode === 201) {
        showSuccess(message);
        setTimeout(() => navigate("/signin"), 3000);
      } else if (message) {
        showError(message);
      }
      resetForm();
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#ffffff] dark:bg-[#000000] text-[#0f172a] dark:text-[#f8fafc] h-full w-full flex justify-center">
      <div className="w-[500px] h-fit md:bg-[#f1f5f9] md:dark:bg-[#1e293b] flex flex-col items-center py-6 px-12 md:mt-20">
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({ handleSubmit }) => (
            <>
              <div className="flex flex-col space-y-4 m-8 w-full">
                <div className="flex flex-col space-y-1">
                  <InputField
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your Email"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <button
                type="button"
                disabled={loading}
                onClick={handleSubmit}
                className="bg-[#6366f1] dark:bg-[#818cf8] dark:hover:bg-indigo-600 text-white py-2.5 md:text-lg text-base font-medium rounded-xl w-full   hover:bg-indigo-600 hover:shadow-md transition duration-500"
              >
                {loading ? "Loading..." : "  Sign Up"}
              </button>
              <p className="md:text-base text-sm ">
                Back to{" "}
                <Link to="/" className="font-semibold  hover:underline">
                  Home
                </Link>
              </p>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
