"use client";

import React from "react";
import Banner from "@/components/home/Banner";
import PartnersCompany from "@/components/home/PartnersCompany";
import Services from "@/components/home/Services";
import Diffrent from "@/components/home/Diffrent";
import AllFile from "@/components/home/AllFile";

const Page = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden">
      {/* Banner */}
      <Banner></Banner>
      {/* Trustet Company */}
      <PartnersCompany />

      {/* Services */}
      <Services />

      {/* Diffrent */}
      <Diffrent />

      {/* All */}
      <AllFile />
    </div>
  );
};

export default Page;
