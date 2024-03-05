import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedinStatus, getToken } from "@/store/authSlice";
import UiInput from "../UiKit/UiInput";
import { blogSearch } from "@/services/services";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();
  const loggedinStatus = useSelector((state) => state.auth.isLoggedin);
  const dispatch = useDispatch();
  const [search,setSearch] = useState('');
  const logout = () => {
    window.localStorage.removeItem("isLoggedin");
    window.localStorage.removeItem("token");
    dispatch(getLoggedinStatus());
    dispatch(getToken());
    router.push("/");
  };
  const searchBlog = (event)=>{
    event.preventDefault();
    const sText = search.replaceAll(" ", "-");
    router.push(`/search/${sText}`);
  }
  useEffect(() => {
    dispatch(getLoggedinStatus());
    dispatch(getToken());
  }, []);
  return (
    <div className="bg-blue-500 h-[80px] w-full flex items-center">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/">
            <h1 className="font-bold text-[25px] text-white">Blog</h1>
          </Link>
          <div className="flex">
            <UiInput
              type="text"
              id="search"
              label=""
              name="search"
              placeholder="Search blog"
              value={search}
              onChange={(event)=>setSearch(event.target.value)}
            />
            <button onClick={searchBlog} className="text-blue-500 rounded px-[5px] bg-white">Search</button>
          </div>
          <div className="flex gap-4">
            {!loggedinStatus && (
              <>
                <Link href="/signup" className="text-white font-semibold">
                  Login
                </Link>
                <Link href="/signin" className="text-white font-semibold">
                  Registration
                </Link>
              </>
            )}
            {loggedinStatus && (
              <>
                <Link href="/my-blog" className="text-white font-semibold">
                  My blog
                </Link>
                <Link href="/add-blog" className="text-white font-semibold">
                  Add blog
                </Link>
                <Link
                  href="/"
                  className="text-white font-semibold"
                  onClick={logout}
                >
                  Logout
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
