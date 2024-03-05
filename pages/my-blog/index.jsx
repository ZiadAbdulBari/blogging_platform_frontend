import BlogCard from "@/components/BlogCard/BlogCard";
import MainLayout from "@/layout/MainLayout";
import { getOwnBlog } from "@/services/services";
import { getLoggedinStatus, getToken } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/Pagination/Pagination";

const MyBlog = () => {
  const dispatch = useDispatch();
  const loggedin = useSelector((state) => state.auth.isLoggedin);
  const token = useSelector((state) => state.auth.token);
  const [blogLists, setBlogLists] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const ownBLog = () => {
    if (loggedin) {
      getOwnBlog(token,page).then((res) => {
        if (res.status == 200) {
          setBlogLists(res.list.list);
          setTotalPage(res.list.totalPage);
          setBlogLists(res.list.list);
        }
      });
    }
  };
  const handlePagination = (pagenumber) => {
    setPage(pagenumber);
  };
  useEffect(() => {
    dispatch(getLoggedinStatus());
    dispatch(getToken());
  }, [loggedin]);
  useEffect(() => {
    ownBLog();
  }, [loggedin, page]);
  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="grid grid-flow-row grid-cols-5 gap-4">
          {blogLists.length > 0 &&
            blogLists.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
        </div>
        <Pagination
          totalPage={totalPage}
          currentPage={page}
          onClick={handlePagination}
        />
      </div>
    </MainLayout>
  );
};

export default MyBlog;
