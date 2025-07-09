import { Link } from "react-router-dom";

import { MdLogout, MdDashboard, MdAdd, MdOutlineRestore } from "react-icons/md";

import { IoMdSettings } from "react-icons/io";

const Sidebar = () => {
  const sidebarLinks = [
    {
      to: "/dashboard/charts",
      label: "Dashboard",
      icon: <MdDashboard size={28} />,
    },
    {
      to: "/dashboard/createTest",
      label: "Add New",
      icon: <MdAdd size={28} />,
    },
    {
      to: "/dashboard/restoreTest",
      label: "Reports",
      icon: <MdOutlineRestore size={28} />,
    },
    {
      to: "/dashboard/setting",
      label: "Setting",
      icon: <IoMdSettings size={28} />,
    },
    {
      to: "/dashboard/myScores",
      label: "Logout",
      icon: <MdLogout size={28} />,
    },
  ];

  return (
    <div className="w-72 h-full flex flex-col bg-[#f1f5f9] dark:bg-[#1e293b] text-[#0f172a] dark:text-[#f8fafc]">
      {/* Sidebar Navigation */}
      <div className="h-full  md:py-6 py-3 ">
        <ul className="flex flex-col text-xl font-medium">
          {sidebarLinks.map((link) => (
            <li
              key={link.to}
              className="flex items-center gap-2 cursor-pointer dark:hover:bg-[#334155] hover:bg-[#e2e8f0] md:py-3 py-2  justify-center"
            >
              <Link
                to={link.to}
                className="flex items-center gap-2 text-base md:text-lg"
              >
                {link.icon}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
