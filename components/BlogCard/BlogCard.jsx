import Link from "next/link";
import { Player, ControlBar } from "video-react";
import "node_modules/video-react/dist/video-react.css";

const BlogCard = ({ blog }) => {
  return (
    <div className="h-[350px] rounded border border border-gray-200">
      <div className="h-[50%] bg-gray-200">
        {blog.video_url ? (
          <Player src={blog.video_url}>
            <ControlBar autoplay={true} autoHide={true} className="my-class" />
          </Player>
        ) : (
          <img
            src={blog?.blogImages[0]?.image_url}
            alt=""
            className=" w-full h-full object-cover"
          />
        )}
      </div>
      <div className="h-[50%] p-2">
        <h1 className="font-semibold text-[20px]">{blog.title}</h1>
        <p className="mt-2 text-gray-500">Author: {blog.author.name}</p>
        <p className="mt-2 text-gray-500">
          Published at: {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <div className="mt-6">
          <Link
            href={`/blog-detail/${encodeURIComponent(blog.id)}`}
            className="bg-blue-500 px-[30px] py-[5px] rounded text-white"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BlogCard;
