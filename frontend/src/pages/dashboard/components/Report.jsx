import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { SelectBox, showError, showSuccess } from "../../../components";
import { useNavigate } from "react-router-dom";
import { getAll } from "../../../api/expense";
import { CATEGORIES, MONTHS } from "../../../../../shared/constants";
import { Button, ExportToPdf } from "../../../components";

const Report = () => {
  const [month, setMonth] = useState("");
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState("");
  const navigate = useNavigate();
  const previewRef = useRef();

  useEffect(() => {
    handleReport();
  }, [month, category, limit]);

  const filters = {
    month,
    category,
    limit: limit,
  };

  const handleReport = async () => {
    try {
      const response = await getAll(filters);
      if (response?.statusCode === 200) {
        setData(response?.data);
      }
    } catch (err) {
      showError(err.message);
    }
  };
  const handleClick = () => {
    const response = ExportToPdf(previewRef);

    if (response) {
      showSuccess("PDF saved!");
    } else {
      showError("PDF export failed");
    }
  };

  return (
    
    <div className="px-4" ref={previewRef}>
      <h1 className="text-3xl font-bold text-center py-4">Report</h1>

      <div className="flex w-full justify-end gap-4">
        <SelectBox
          label="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          options={MONTHS}
        />
        <SelectBox
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={[...CATEGORIES, "Select All"]}
        />
      </div>

      <div className="h-full w-full mt-4">
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn className="text-sm">TITLE</TableColumn>
            <TableColumn className="text-sm">AMOUNT</TableColumn>
            <TableColumn className="text-sm">CATEGORY</TableColumn>
            <TableColumn className="text-sm">TYPE</TableColumn>
            <TableColumn className="text-sm">DATE</TableColumn>
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
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 text-base">
        <label htmlFor="rows" className="font-medium">
          Rows per page:
        </label>

        <SelectBox
          label="Limit"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          options={["10", "50", "100"]}
        />
      </div>

      <div className="flex justify-center items-end mt-8">
        <Button onClick={handleClick} width="w-[150px]">
          Export as Pdf
        </Button>
      </div>
    </div>
  );
};

export default Report;
