import MainLayout from "@/layout/MainLayout";
import { readFullBlog } from "@/services/services";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Detail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedinStatus = useSelector((state) => state.auth.isLoggedin);
  const token = useSelector((state) => state.auth.token);
  const [data, setData] = useState({});
  const detailData = () => {
    const id = router.query.id;
    readFullBlog(id).then((res) => {
      console.log(res);
      if (res.status == 200) {
        setData(res.detail);
      }
    });
  };
  useEffect(() => {
    if (router.query.id) {
      detailData();
    }
  }, [router]);
  return (
    <MainLayout>
      <div className="container mx-auto ">
        <div className="h-[400px]">
          {data?.blogImages?.length > 0 && (
            <img
              src={data?.blogImages[0]?.image_url}
              alt=""
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <h1 className="mt-4 text-[25px] font-semibold ">{data.title}</h1>
        <p>Author: {data?.author?.name}</p>
        <p>Published at: {new Date(data.createdAt).toLocaleDateString()}</p>
        <div className="mt-4" dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    </MainLayout>
  );
};
export default Detail;
