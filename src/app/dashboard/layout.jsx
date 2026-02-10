import React from "react";
import DashboardLayoutContent from "@/components/dashboard/DashboardLayoutContent";

export const metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Dashboard | Care.xyz",
  },
  description: "Manage your bookings, messages, and account settings.",
  robots: {
    index: false, // Generally dashboard pages should not be indexed
    follow: false,
  },
};
 
const DashboardLayout = ({ children }) => {
  return <DashboardLayoutContent>{children}</DashboardLayoutContent>;
};

export default DashboardLayout;
