import { getcaregiversData } from "@/actions/serverData/getData";
import FullPages from "@/components/caregivers/FullPages";
import React from "react";

const page = async () => {
  const caregivers = await getcaregiversData();
  console.log("getcaregiversData", caregivers);

  return (
    <div>
      <FullPages caregivers={caregivers} />
    </div>
  );
};

export default page;
