import BlogCard from "@/components/BlogCard/BlogCard";
import MainLayout from "@/layout/MainLayout";
import { getBlog } from "@/services/services";
import { useDispatch } from "react-redux";
import { getLoggedinStatus, getToken } from "@/store/authSlice";
import { useEffect, useState } from "react";
export default function Home() {
  const dispatch = useDispatch();
  const [blogLists, setBlogLists] = useState([]);
  const getBlogList = () => {
    getBlog().then((response) => {
      if (response.status == 200) {
        setBlogLists(response.list);
      }
    });
  };
  useEffect(() => {
    getBlogList();
  }, []);
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
          </div>
        </div>
      </MainLayout>
    </main>
  );
}
