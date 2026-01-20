import { getSingleCaregiver } from "@/actions/serverData/getData";
import CaregiverDetailsPage from "@/components/caregivers/DelicesOnebyOneId";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const caregiver = await getSingleCaregiver(id);
  console.log(caregiver);

  return (
    <div>
      <CaregiverDetailsPage caregiver={caregiver} />
    </div>
  );
};

export default page;
