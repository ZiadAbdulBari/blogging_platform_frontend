import Link from "next/link";
const BlogCard = ({ blog }) => {
  return (
    <Link href={`/blog-detail/${encodeURIComponent(blog.id)}`}>
      <div className="h-[350px] rounded border border border-gray-200">
        <div className="h-[50%] bg-gray-200">
          <img src={blog?.blogImages[0]?.image_url} alt="" className=" w-full h-full object-cover" />
        </div>
        <div className="h-[50%] p-2">
          <h1 className="font-semibold text-[20px]">{blog.title}</h1>
          <p className="mt-2 text-gray-500">Author: {blog.author.name}</p>
          <p className="mt-2 text-gray-500">Published at: {new Date(blog.createdAt).toLocaleDateString()}</p>
          <button className="bg-blue-500 px-[30px] py-[5px] rounded text-white mt-6 ">Read more</button>
        </div>
      </div>
    </Link>
  );
};
export default BlogCard;
