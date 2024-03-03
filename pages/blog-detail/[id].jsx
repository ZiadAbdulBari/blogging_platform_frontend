
import MainLayout from "@/layout/MainLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Detail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedinStatus = useSelector((state) => state.auth.isLoggedin);
  const token = useSelector((state) => state.auth.token);
  const detailData = () => {
    const URL = `${process.env.baseurl}/blog-detail/${router.query.id}`;
    
  };
  useEffect(() => {
    if (router.query.id) {
      detailData();
    }
  }, [router]);
  return (
    <MainLayout>
      <div className="container mx-auto ">
        dfdf
      </div>
    </MainLayout>
  );
};
export default Detail;
