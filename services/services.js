import axios from "axios";
export const registration = async (name, email, password) => {
  try {
    const data = { name, email, password };
    const response = await axios.post(
      `${process.env.baseurl}/auth/registration`,
      data
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
export const login = async (email, password) => {
  try {
    const data = { email, password };
    const response = await axios.post(
      `${process.env.baseurl}/auth/login`,
      data
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
export const getBlog = async (page) => {
  try {
    const response = await axios.get(`${process.env.baseurl}/blog/list-blog?page=${page}&pageSize=2}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
export const makeBlog = async (data, token) => {
  try {
    const response = await axios.post(
      `${process.env.baseurl}/blog/create-blog`,
      data,
      {
        "Content-Type": "multipart/form-data",
        headers: { Authorization: token },
      }
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
export const getOwnBlog = async (token,page) => {
  try {
    const response = await axios.get(`${process.env.baseurl}/blog/own-blog?page=${page}&pageSize=2}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};
export const readFullBlog = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.baseurl}/blog/blog-detail/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
export const blogSearch = async (searchkey) => {
  try {
    const data = {searchkey:searchkey}
    const response = await axios.post(
      `${process.env.baseurl}/blog/blog-search`,data
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
