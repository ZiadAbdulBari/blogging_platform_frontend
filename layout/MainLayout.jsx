import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MainLayout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default MainLayout;
