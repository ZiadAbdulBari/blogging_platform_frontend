import UiButton from "@/components/UiKit/UiButton";
import UiInput from "@/components/UiKit/UiInput";
import dynamic from "next/dynamic";
import MainLayout from "@/layout/MainLayout";
import { getLoggedinStatus, getToken } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { makeBlog } from "@/services/services";
const AddBlog = () => {
  const dispatch = useDispatch();
  const loggedin = useSelector((state) => state.auth.isLoggedin);
  const token = useSelector((state) => state.auth.token);
  const UiEditor = dynamic(() => import("@/components/UiKit/UiEditor"), {
    ssr: false,
  });
  const [inputValue, setInputValue] = useState({
    title: "",
    image: [],
  });
  const [editorData, setEditorData] = useState("");
  const handleChangeInput = (event) => {
    if (event.target.name == "title") {
      setInputValue({ ...inputValue, title: event.target.value });
    } else if (event.target.name == "blogpicture") {
      console.log(event.target.files);
      setInputValue({ ...inputValue, image: event.target.files });
    }
  };
  const handleFocus = (event) => {
    event.preventDefault();
  };
  const addBlog = () => {
    if (loggedin) {
      let formData = new FormData();
      formData.append("title", inputValue.title);
      formData.append("content", editorData);
      for (let i = 0; i < inputValue.image.length; i++) {
        formData.append("images", inputValue.image[i]);
      }
      makeBlog(formData, token).then((res) => {
        console.log(res);
      });
    }
  };
  const getEditorData = (data) => {
    setEditorData(data);
  };
  useEffect(() => {
    dispatch(getLoggedinStatus());
    dispatch(getToken());
  }, []);
  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="w-[100%]">
          <div className="gridgrid-cols-2 gap-x-4">
            <div>
              <label className="mb-2">Select images</label>
              <input
                className="w-full"
                type="file"
                id="blogpicture"
                name="blogpicture"
                onChange={handleChangeInput}
                multiple
              />
            </div>
            <UiInput
              label="Blog title"
              type="text"
              value={inputValue.title}
              name="title"
              placeholder="Ente your blog title"
              onChange={handleChangeInput}
              onFocus={handleFocus}
            />
            <UiEditor getEditorData={getEditorData} value={editorData} />
          </div>
          <div className="flex justify-end mt-[100px] gap-4">
            <UiButton
              buttonName="Add blog"
              externalClass="bg-blue-500 text-white !font-medium"
              onClick={addBlog}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddBlog;
