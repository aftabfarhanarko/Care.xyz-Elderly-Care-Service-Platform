import { getSingleCaregiver } from "@/actions/serverData/getData";
import CaregiverDetailsPage from "@/components/caregivers/DelicesOnebyOneId";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const caregiver = await getSingleCaregiver(id);

  if (!caregiver) {
    return {
      title: "Caregiver Not Found",
      description: "The requested caregiver could not be found.",
    };
  }

  return {
    title: `${caregiver.name || "Caregiver Details"}`,
    description: `Hire ${caregiver.name}, a professional ${caregiver.role || "caregiver"}. View their profile, reviews, and availability on Care.xyz.`,
    openGraph: {
      title: `${caregiver.name} - Professional Caregiver`,
      description: caregiver.about || `Hire ${caregiver.name} on Care.xyz`,
      images: caregiver.image ? [{ url: caregiver.image }] : [],
    },
  };
}

const page = async ({ params }) => {
  const { id } = await params;
  const caregiver = await getSingleCaregiver(id);
  // console.log(caregiver);

  return (
    <div>
      <CaregiverDetailsPage caregiver={caregiver} />
    </div>
  );
};

export default page;
