import BlogCard from "@/components/BlogCard/BlogCard";
import MainLayout from "@/layout/MainLayout";
import { blogSearch } from "@/services/services";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SearchPage = () => {
    const router = useRouter();
  const [query, setQuery] = useState("");
  const [blogLists, setBlogLists] = useState([]);
  const getSearchedBlog = () => {
    blogSearch(query).then((res) => {
        if(res.status==200){
            setBlogLists(res.list);
        }
        else{
            console.log(res);
        }
    });
  };
  useEffect(() => {
    if (router?.query?.name) {
      setQuery(router.query.name);
    }
  }, [router]);
  useEffect(() => {
    if (query) {
      getSearchedBlog();
    }
  }, [query]);
  return (
    <div>
      <MainLayout>
        <div className="container mx-auto">
          <div className="grid grid-flow-row grid-cols-5 gap-4">
            {blogLists.length > 0 ?
              blogLists.map((blog, index) => (
                <BlogCard key={index} blog={blog} />
              )):
              (<p className="text-semibold text-[20px]">No blog found</p>)
            }
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default SearchPage;
