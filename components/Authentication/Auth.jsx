import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedinStatus, getToken } from "../../store/authSlice";
import toastMessage from "@/plugings/toastify";
import UiInput from "../UiKit/UiInput";
import { login, registration } from "@/services/services";

const Auth = ({ pageName, text, link }) => {
  const loggedinStatus = useSelector((state) => state.auth.isLoggedin);
  const dispatch = useDispatch();
  const router = useRouter();
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const handleChangeField = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const userLogin = () => {
    login(state.email, state.password).then((res) => {
      if (res.status == 200) {
        const token = res?.access_token;
        window.localStorage.setItem("token", JSON.stringify(token));
        window.localStorage.setItem("isLoggedin", JSON.stringify(true));
        dispatch(getLoggedinStatus());
        dispatch(getToken());
        toastMessage(res?.message, "s");
        router.push("/");
      }
    });
  };
  const userRegistration = () => {
    registration(state.name, state.email, state.password).then((res) => {
      if (res.status == 200) {
        router.push("/signup");
      }
      else{
        toastMessage(res?.data?.message, "e");
      }
    });
  };
  const authCnotroller = (e) => {
    e.preventDefault();
    if (pageName == "Registration") {
      userRegistration();
    } else {
      userLogin();
    }
  };
  return (
    <div className="flex w-screen h-screen justify-center items-center px-[10px] lg:px-0">
      <div className="shadow-1 p-[30px] lg!p-[40px]">
        <p className="text-center text-[25px] text-[40px] font-extrabold text-blue-500">
          Blog
        </p>
        <div className="grid grid-flow-row gap-4 w-[500px] bg-white rounded-[5px] mt-8">
          {pageName == "Registration" && (
            <UiInput
              type="text"
              id="name"
              label="Name"
              name="name"
              placeholder="Enter your name"
              value={state.name}
              onChange={handleChangeField}
            />
          )}
          <UiInput
            type="email"
            id="email"
            label="Email address"
            name="email"
            placeholder="Enter your email address"
            value={state.email}
            onChange={handleChangeField}
          />
          <UiInput
            label="Password"
            type="password"
            id="password"
            className="input"
            name="password"
            placeholder="Enter your password"
            value={state.password}
            onChange={handleChangeField}
          />
          <p className="text-center text-gray-500">
            {text}
            <Link href={link} className="font-medium text-gray-600">
              {pageName == "Registration" ? "Login" : "Registration"}
            </Link>
          </p>
          <div className="text-center bg-blue-500 py-2 text-white text-[18px]">
            <button className="button" onClick={authCnotroller}>
              {pageName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Auth;
