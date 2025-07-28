import React, { useState } from "react";
import {
  SelectBox,
  showError,
  Button,
  useHandleResponse,
  convertCurrency,
} from "./index";
import { CURRENCIES, THEMES } from "../../../shared/constants";
import { appStore, authStore } from "../store";
import { editUser } from "../api";

const GeneralSetting = () => {
  const CurrentTheme = appStore((state) => state.theme);
  const CurrentLimit = appStore((state) => state.limit);
  const Theme = appStore((state) => state.setTheme);
  const setLimit = appStore((state) => state.setLimit);
  const User = authStore((state) => state.user);
  const setUser = authStore((state) => state.setUser);
  const [theme, setTheme] = useState(CurrentTheme);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState(User.currency);
  const Response = useHandleResponse();

  const handleClick = async () => {
    try {
      setLoading(true);
      Theme(theme);
      setUser({ currency: currency });
      if (User?.currency !== currency) {
        const convertedLimit = await convertCurrency(
          Number(CurrentLimit),
          currency,
          User.currency
        );

        setLimit(convertedLimit);
      }

      const response = await editUser({ currency, email: User.email });
      Response({ response });
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" flex flex-col items-center justify-center gap-6">
      <h1 className="text-xl font-semibold ">General Setting</h1>
      <div className="w-[600px] flex flex-col gap-4  ">
        <SelectBox
          label="Set Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          options={CURRENCIES}
        />
        <SelectBox
          label="Set as Theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          options={THEMES}
        />

        <Button onClick={handleClick}>
          {" "}
          {loading ? "Loading..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default GeneralSetting;
