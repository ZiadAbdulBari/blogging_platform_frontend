
import MainLayout from "@/layout/MainLayout";
import toastMessage from "@/plugings/toastify";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Detail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedinStatus = useSelector((state) => state.auth.isLoggedin);
  const token = useSelector((state) => state.auth.token);
  const detailData = () => {
    const URL = `${process.env.baseurl}/product-detail/${router.query.id}`;
    axios
      .get(URL)
      .then((response) => {
        if (response?.data?.status == 200) {
          console.log(response);
          setDetails(response?.data?.products);
          setVariant(response?.data?.variant);
          setImages(response?.data?.products?.productImages);
          // console.log(response);
        }
      })
      .catch((error) => {
        console.log(error?.response?.message);
      });
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
