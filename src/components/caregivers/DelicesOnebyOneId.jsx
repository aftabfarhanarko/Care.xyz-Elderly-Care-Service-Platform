"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { caregivers } from "@/data/caregivers";
import DetlicesData from "@/components/caregivers/DetlicesData";

const CaregiverDetailsPage = ({ caregiver: serverCaregiver }) => {
  const params = useParams();
  const [caregiver, setCaregiver] = useState(serverCaregiver || null);
  const [loading, setLoading] = useState(!serverCaregiver);

  useEffect(() => {
    if (serverCaregiver) {
      setCaregiver(serverCaregiver);
      setLoading(false);
      return;
    }

    // Simulate loading for smooth animation
    if (params?.id) {
      const found = caregivers.find((c) => c.id === parseInt(params.id));
      setCaregiver(found);
      setLoading(false);
    }
  }, [params?.id, serverCaregiver]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-900 dark:via-rose-950 dark:to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-rose-600 dark:border-rose-500"></div>
      </div>
    );
  }

  return <DetlicesData caregiver={caregiver} />;
};

export default CaregiverDetailsPage;
