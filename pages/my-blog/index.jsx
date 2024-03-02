import BlogCard from "@/components/BlogCard/BlogCard";
import MainLayout from "@/layout/MainLayout";
import { getOwnBlog } from "@/services/services";
import { getLoggedinStatus, getToken } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

const MyBlog = () => {
  const dispatch = useDispatch();
  const loggedin = useSelector((state) => state.auth.isLoggedin);
  const token = useSelector((state) => state.auth.token);
  const [blogLists, setBlogLists] = useState([]);
  const ownBLog = () => {
    getOwnBlog(token).then((res) => {
      console.log(res);
      if (res.status == 200) {
        setBlogLists(res.list);
      }
    });
  };
  useEffect(() => {
    dispatch(getLoggedinStatus());
    dispatch(getToken());
  }, []);
  useEffect(() => {
    ownBLog();
  }, []);
  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="grid grid-flow-row grid-cols-5 gap-4">
          {blogLists.length > 0 &&
            blogLists.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default MyBlog;
