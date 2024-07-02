import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://article-extractor-and-summarizer.p.rapidapi.com/",
  headers: {
    "x-rapidapi-key": "a2bacad119msh2a5d3cdea8b5204p1259a4jsn570e40230992",
    "x-rapidapi-host": "article-extractor-and-summarizer.p.rapidapi.com",
  },
});
