import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Avatar,
  Stack,
  Paper,
  Divider,
} from "@mui/material";
import { getCategoryData } from "../api";
import { FaQuestionCircle } from "react-icons/fa";
import { CATEGORIES } from "../../../shared/constants";
import { categoryIcons } from "./index";

function ProgressBar() {
  const [categorydata, setCategoryData] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await getCategoryData();
        const data = res.data.result;
        setTotalBudget(res.data.budgetData?.budget);
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

  const colors = ["#1976d2", "#9c27b0", "#f44336", "#ff9800", "#009688"];

  return (
    <Paper
      sx={{ maxWidth: 820, p: 3, borderRadius: 3, backgroundColor: "#f9fafb" }}
    >
      <p className="text-lg font-semibold text-gray-800 mb-1">
        🔍 Spending Breakdown by Category
      </p>
      <p className=" text-sm text-gray-500 mb-4 mx-4">
        Track which categories consume most of your budget.
      </p>

      {categorydata.map((item, index) => (
        <Box key={index} mb={3}>
          <Stack direction="row" alignItems="center" spacing={2} mb={1}>
            <Avatar sx={{ bgcolor: colors[index % colors.length] }}>
              {item.icon}
            </Avatar>
            <Box flexGrow={1}>
              <Typography variant="subtitle1" fontWeight="500">
                {item.category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ₹{item.amount}
              </Typography>
            </Box>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={totalBudget > 0 ? (item.amount / totalBudget) * 100 : 0}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: colors[index % colors.length],
              },
            }}
          />
        </Box>
      ))}
    </Paper>
  );
}

export default ProgressBar;
