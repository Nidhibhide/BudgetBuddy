import React, { useState, useEffect } from "react";
import { Box, Typography, LinearProgress, Avatar, Stack } from "@mui/material";
import { FaUtensils, FaShoppingBag, FaCar } from "react-icons/fa";
import { getCategoryData } from "../api";
import { FaQuestionCircle } from "react-icons/fa";
import { CATEGORIES } from "../../../shared/constants";
import { categoryIcons } from "./index";
function ProgressBar() {
  const [categorydata, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await getCategoryData();
        const data = res.data;

        const finalData = CATEGORIES.map((cat) => {
          const found = data.find((item) => item.category === cat);
          return {
            category: cat,
            amount: found?.totalExpense || 0,
            icon: categoryIcons[cat] || (
              <FaQuestionCircle size={20} color="white" />
            ),
          };
        });
        setCategoryData(finalData);
      } catch (error) {
        console.error("Failed to load categories data:", error);
      }
    };

    fetchCategoryData();
  }, []);

  const max = categorydata.map((item) => item.amount);
  const colors = ["#1976d2", "#9c27b0", "#f44336"];

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", padding: 3 }}>
      {categorydata.map((item, index) => (
        <Box key={index} mb={2}>
          <Stack direction="row" alignItems="center" spacing={2} mb={1}>
            <Avatar sx={{ bgcolor: colors[index] }}>{item.icon}</Avatar>
            <Box flexGrow={1}>
              <Typography variant="subtitle1">{item.category}</Typography>
              <Typography variant="body2" color="text.secondary">
                ₹{item.amount}
              </Typography>
            </Box>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={(item.amount / max) * 100}
            sx={{
              height: 10,
              borderRadius: 5,
              "& .MuiLinearProgress-bar": {
                backgroundColor: colors[index],
              },
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

export default ProgressBar;
