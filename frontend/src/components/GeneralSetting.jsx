import React, { useState } from "react";
import { Formik } from "formik";
import { SelectBox } from "./index";

const GeneralSetting = () => {
  const [month, setMonth] = useState("");
  const [category, setCategory] = useState("");
  // const navigate = useNavigate();

  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const categories = [
    { value: "Hotel", label: "Hotel" },
    { value: "Travel", label: "Travel" },
    { value: "Food", label: "Food" },
    { value: "Shopping", label: "Shopping" },
    { value: "Others", label: "Others" },
  ];
  return (
    <div>
      {" "}
      <Formik
        initialValues={{ email: "", password: "" }}
        // validationSchema={validationSchema}
        // onSubmit={handleSignIn}
      >
        {({ handleSubmit }) => (
          <>
            <div className="w-full flex flex-col gap-4">
              <SelectBox
                label="Select Currency"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                options={months}
              />
              <SelectBox
                label="Set as Theme"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={categories}
              />
              <button
                onClick={handleSubmit}
                type="button"
                //   disabled={loading}
                className="bg-[#6366f1] dark:bg-[#818cf8] text-white  py-2.5 md:text-lg text-base font-medium rounded-xl  hover:bg-indigo-600   hover:shadow-md transition duration-500 w-full"
              >
                {/* {loading ? "Loading..." : "Sign In"} */}
                Save Changes
              </button>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default GeneralSetting;
