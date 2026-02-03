"use client";
import { getCurrentUser } from "@/actions/serverData/dashbordApi";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useRole = () => {
  const { data: session } = useSession();
  const [role, setRole] = useState(null); // Default to null (loading state) to prevent flicker

  useEffect(() => {
    const fetchUserRole = async () => {
      if (session?.user?.email) {
        try {
          const userData = await getCurrentUser(session.user.email);
          if (userData?.user?.role) {
            console.log("Database Role:", userData.user.role);
            setRole(userData.user.role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };

    fetchUserRole();
  }, [session]);

  return role;
};

export default useRole;
