import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputField } from "../../../components";
import { signin, signinwithGoogle, getMe } from "../../../api/user";
import { Link ,useNavigate} from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import authStore from "../../../store/authStore";
import { showSuccess, showError } from "../../../components/ToastUtil";
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const setUser = authStore((state) => state.setUser);
  const navigate = useNavigate();
  // validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string()
      .matches(/^\d+$/, "Password must contain digits only")
      .min(5, "Password must be at least 5 characters")
      .max(10, "Password must not exceed 10 characters")
      .required("Password is required"),
  });

  // handle sign in
  const handleSignIn = async (values, { resetForm }) => {
    try {
      if (loading) return;
      setLoading(true);
      const signinRes = await signin(values);
      const { message: signinMsg, statusCode: signinStatus } = signinRes;

      if (signinStatus === 200) {
        showSuccess(signinMsg);

        const userRes = await getMe();
        const { statusCode: getMeStatus, data } = userRes;
        if (getMeStatus === 200) {
          setUser(data);
        }
        setTimeout(() => navigate("/dashboard/charts"), 3000);
      } else if (signinMsg) {
        showError(signinMsg);
      }
      resetForm();
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //handle sign in with google
  const handleGoogleLogin = async (values) => {
    try {
      const token = values?.credential;

      const res = await signinwithGoogle(token);
      const { message: signinMsg, statusCode: signinStatus } = res;

      if (signinStatus === 200) {
        showSuccess(signinMsg);

        const userRes = await getMe();
        const { statusCode: getMeStatus, data } = userRes;
        if (getMeStatus === 200) {
          console.log(data);
          setUser(data);
        }
        setTimeout(() => navigate("/dashboard/charts"), 3000);
      } else if (signinMsg) {
        showError(signinMsg);
      }
    } catch (err) {
      showError(err.message);
    }
  };
  return (
    <div className=" bg-[#ffffff] dark:bg-[#000000] text-[#0f172a] dark:text-[#f8fafc] h-full w-full flex justify-center">
      <div className="w-[500px] h-fit  flex flex-col items-center py-8 px-12 md:mt-20 md:bg-[#f1f5f9] md:dark:bg-[#1e293b] ">
        <div className="mb-4 flex justify-center ">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => showError("Google Login failed")}
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
          onSubmit={handleSignIn}
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
                disabled={loading}
                className="bg-[#6366f1] dark:bg-[#818cf8] text-white  py-2.5 md:text-lg text-base font-medium rounded-xl  hover:bg-indigo-600   hover:shadow-md transition duration-500 w-full"
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
              <p className="md:text-base text-sm ">
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
