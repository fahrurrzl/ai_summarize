import { axiosInstance } from "../libs/axios";

export const getSummary = async (artcileUrl, callback) => {
  try {
    const res = await axiosInstance(`/summarize?url=${artcileUrl}&length=3`);
    callback(res.data);
  } catch (err) {
    throw new Error(err);
  }
};
