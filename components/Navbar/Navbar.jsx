import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedinStatus, getToken } from "@/store/authSlice";
const Navbar = () => {
  const loggedinStatus = useSelector((state) => state.auth.isLoggedin);
  const dispatch = useDispatch();
  const logout = () => {
    window.localStorage.removeItem("isLoggedin");
    window.localStorage.removeItem("token");
    dispatch(getLoggedinStatus());
    dispatch(getToken());
    router.push("/");
  };
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
