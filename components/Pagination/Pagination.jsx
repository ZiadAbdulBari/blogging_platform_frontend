import React from "react";

const Pagination = ({ totalPage,onClick,currentPage }) => {
  return (
    <div>
      <ul className="flex gap-4 justify-end">
        {[...Array(totalPage)].map((e, i) => {
          return <li className={`mt-4 cursor-pointer px-[20px] py-[10px] rounded border border-gray-200 bg-white text-black ${currentPage==i+1 && '!bg-blue-500 !text-white'}`} key={i} onClick={()=>onClick(i+1)}>{i+1}</li>;
        })}
      </ul>
    </div>
  );
};

export default Pagination;
