import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { showError,Button } from "./index";
import { useNavigate } from "react-router-dom";
import { getAllExpense } from "../api";

const LatestTransaction = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLatestExpenses();
  }, []);

  const fetchLatestExpenses = async () => {
    try {
      const filters = {
        limit: 4, // only get 4 latest transactions
      };

      const response = await getAllExpense(filters);
      if (response?.statusCode === 200) {
        setData(response?.data);
      }
    } catch (err) {
      showError(err.message);
    }
  };

  return (
    <div className="px-4">
      <h1 className="text-xl font-semibold text-center py-4">
        Latest Transactions
      </h1>

      <Table
        className="table-fixed w-full"
        isStriped
        aria-label="Latest transactions table"
      >
        <TableHeader>
          <TableColumn className="text-sm w-[35%]">TITLE</TableColumn>
          <TableColumn className="text-sm w-[15%]">AMOUNT</TableColumn>
          <TableColumn className="text-sm w-[20%]">CATEGORY</TableColumn>
          <TableColumn className="text-sm w-[15%]">TYPE</TableColumn>
          <TableColumn className="text-sm w-[15%]">DATE</TableColumn>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <TableRow
                key={item._id || index}
                className="hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors duration-200"
              >
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleDateString("en-GB")}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-6">
        <Button
           width="w-[150px]"
           onClick={() => navigate("/dashboard/report")}
        >
          {" "}
          <div className="flex justify-center items-center gap-1">
            Read more
          </div>
        </Button>
      </div>
    </div>
  );
};

export default LatestTransaction;
