import { getcaregiversData } from "@/actions/serverData/getData";
import FullPages from "@/components/caregivers/FullPages";
import React from "react";

export const metadata = {
  title: "Find Caregivers",
  description: "Browse our list of professional and verified caregivers to find the perfect match for your family.",
};

const page = async () => {
  const caregivers = await getcaregiversData();
  // console.log("getcaregiversData", caregivers);

  return (
    <div className=" pt-10">
      <FullPages caregivers={caregivers} />
    </div>
  );
};

export default page;
