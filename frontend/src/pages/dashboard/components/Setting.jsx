import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box } from "@mui/material";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
import {
  GeneralSetting,
  UserSetting,
  FinancialSetting,
} from "../../../components";

const Setting = () => {
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold text-center py-4">Settings</h1>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="settings tabs"
          >
            <Tab label="General Settings" {...a11yProps(0)} />
            <Tab label="User Settings" {...a11yProps(1)} />
            <Tab label="Financial Settings" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <GeneralSetting />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <UserSetting />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <FinancialSetting />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default Setting;
