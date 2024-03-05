import BlogCard from "@/components/BlogCard/BlogCard";
import MainLayout from "@/layout/MainLayout";
import { getBlog } from "@/services/services";
import { useDispatch } from "react-redux";
import { getLoggedinStatus, getToken } from "@/store/authSlice";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
export default function Home() {
  const dispatch = useDispatch();
  const [blogLists, setBlogLists] = useState([]);
  const [page,setPage] = useState(1);
  const [totalPage,setTotalPage] = useState(0);
  const getBlogList = () => {
    getBlog(page).then((response) => {
      if (response.status == 200) {
        setPage(response.list.currentpage);
        setTotalPage(response.list.totalPage);
        setBlogLists(response.list.list);
      }
    });
  };
  const handlePagination = (pagenumber)=>{
    setPage(pagenumber);
    console.log(pagenumber)
  }
  useEffect(() => {
    getBlogList();
  }, [page]);
  useEffect(() => {
    dispatch(getLoggedinStatus());
    dispatch(getToken());
  }, []);
  return (
    <main>
      <MainLayout>
        <div className="w-full mt-4">
          <div className="container mx-auto">
            <div className="grid grid-flow-row grid-cols-5 gap-4">
              {blogLists.length > 0 &&
                blogLists.map((blog, index) => (
                  <BlogCard key={index} blog={blog} />
                ))}
            </div>
            <Pagination totalPage={totalPage} currentPage={page} onClick={handlePagination}/>
          </div>
        </div>
      </MainLayout>
    </main>
  );
}
