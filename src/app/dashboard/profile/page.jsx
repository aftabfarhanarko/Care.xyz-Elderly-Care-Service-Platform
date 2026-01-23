import React from "react";
import ProfileContent from "@/components/dashboard/ProfileContent";
import { getCurrentUser } from "@/actions/serverData/dashbordApi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const ProfilePage = async () => {
  const { user } = await getServerSession(authOptions);

  const userData = await getCurrentUser(user?.email);
  console.log("Daata Base Data",userData.user);
  const realUser = userData?.user;

  return <ProfileContent realUser={realUser}/>;
};

export default ProfilePage;
