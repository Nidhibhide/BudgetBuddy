import React from "react";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const showSuccess = (message = "Operation Success") => {
  toast.success(message);
};
export const showError = (message = "Operation Failed") => {
  toast.error(message);
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

export const ExportToPdf = async (previewRef) => {
  try {
    const element = previewRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("report.pdf");

    return true;
  } catch (error) {
    console.error("PDF Export failed:", error);
    return false;
  }
};
