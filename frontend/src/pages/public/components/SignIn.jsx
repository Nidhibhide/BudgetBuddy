import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputField } from "../../../components";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
const SignIn = () => {
  // validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string()
      .matches(/^\d+$/, "Password must contain digits only")
      .min(5, "Password must be at least 5 characters")
      .max(10, "Password must not exceed 10 characters")
      .required("Password is required"),
  });
  return (
    <div className=" bg-[#ffffff] dark:bg-[#000000] text-[#0f172a] dark:text-[#f8fafc] h-full w-full flex justify-center">
      <div className="w-[500px] h-fit  flex flex-col items-center py-8 px-12 md:mt-20 md:bg-[#f1f5f9] md:dark:bg-[#1e293b] ">
        <div className="mb-4 flex justify-center ">
          <GoogleLogin
            // onSuccess=
            onError={() => toast.error("Google Login Failed")}
            theme="filled_blue"
            size="large"
            text="continue_with"
            width="270"
          />
        </div>

        <div className="flex items-center">
          <div className=" flex-1 "></div>
          <span className="mx-4  font-semibold">OR</span>
          <div className=" flex-1 "></div>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          //   onSubmit={handleSignIn}
        >
          {({ handleSubmit }) => (
            <>
              <div className="flex flex-col space-y-4 mb-8 w-full">
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
                onClick={handleSubmit}
                type="button"
                // disabled={loading}
                className="bg-[#6366f1] dark:bg-[#818cf8] text-white md:py-3 py-2.5 md:text-lg text-base font-medium rounded-xl  hover:bg-indigo-600   hover:shadow-md transition duration-500 w-full"
              >
                {/* {loading ? "Loading..." : "Sign In"} */}
                Sign In
              </button>
              <p className="md:text-lg text-sm ">
                New User?{" "}
                <Link to="/signup" className="font-semibold  hover:underline">
                  Sign Up
                </Link>
              </p>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
