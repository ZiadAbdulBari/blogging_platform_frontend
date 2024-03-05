import UiButton from "@/components/UiKit/UiButton";
import UiInput from "@/components/UiKit/UiInput";
import dynamic from "next/dynamic";
import MainLayout from "@/layout/MainLayout";
import { getLoggedinStatus, getToken } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { makeBlog } from "@/services/services";
import { useRouter } from "next/router";
const AddBlog = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const loggedin = useSelector((state) => state.auth.isLoggedin);
  const token = useSelector((state) => state.auth.token);
  const UiEditor = dynamic(() => import("@/components/UiKit/UiEditor"), {
    ssr: false,
  });
  const [inputValue, setInputValue] = useState({
    title: "",
    image: [],
    video:[],
  });
  const [editorData, setEditorData] = useState("");
  const handleChangeInput = (event) => {
    if (event.target.name == "title") {
      setInputValue({ ...inputValue, title: event.target.value });
    } else if (event.target.name == "blogpicture") {
      setInputValue({ ...inputValue, image: event.target.files });
    } else if (event.target.name == "blogvideo") {
      console.log(event.target.files)
      setInputValue({ ...inputValue, video: event.target.files });

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
      for (let i = 0; i < inputValue.video.length; i++) {
        formData.append("video", inputValue.video[i])
      }
      makeBlog(formData, token).then((res) => {
        console.log(res);
        if(res.status==200){
          router.push('/');
        }
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>
                Select images <span className="text-red-500"> (multiple image you can select at a time){" "}
                </span>
              </label>
              <input
                className="w-full mt-2"
                type="file"
                id="blogpicture"
                name="blogpicture"
                onChange={handleChangeInput}
                multiple
              />
            </div>
            <div>
              <label>
                Select video{" "}
                <span className="text-red-500">
                  (one video you can select at a time)
                </span>
              </label>
              <input
                className="w-full mt-2"
                type="file"
                id="blogvideo"
                name="blogvideo"
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
