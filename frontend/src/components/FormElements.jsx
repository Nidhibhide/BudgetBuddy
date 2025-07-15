import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,TextField
} from "@mui/material";
import { useField } from "formik";

export const SelectBox = ({ label, value, options, onChange }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          label={label}
          onChange={onChange}
          MenuProps={{
            disablePortal: true, // ✅ prevent modal from closing on select
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5,
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export const InputBox = ({ label, name, type = "text" }) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      {...field}
      type={type}
      label={label}
      variant="standard"
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      fullWidth
    />
  );
};

export const Button = ({
  children,
  onClick,
  type = "submit",
  disabled = false,
  width = "w-full",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#6366f1] dark:bg-[#818cf8] text-white py-2  text-base font-medium rounded-xl hover:bg-indigo-600 hover:shadow-md transition duration-500 ${width} ${className}`}
    >
      {children}
    </button>
  );
};
export const MultiSelect = ({
  label,
  options,
  selected = [],
  onChange,
  error,
  helperText,
}) => {
  return (
    <FormControl fullWidth size="small" variant="outlined" error={!!error}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={selected}
        onChange={onChange}
        label={label}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={{
          disablePortal: true, // ✅ prevent modal from closing on select
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5,
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={selected.includes(option)} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const Tooltip = ({ label, children }) => {
  return (
    <div className="relative group inline-block cursor-pointer">
      {children}
      <span className="absolute hidden group-hover:block top-full mt-1 left-1/2 -translate-x-1/2 bg-black text-white text-sm rounded px-2 py-1 whitespace-nowrap z-50">
        {label}
      </span>
    </div>
  );
};