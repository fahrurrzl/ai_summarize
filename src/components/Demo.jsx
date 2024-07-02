import { useEffect, useState } from "react";
import { BsLink } from "react-icons/bs";
import { axiosInstance } from "../libs/axios";
import { getSummary } from "../services/summary.service";
import { IoCopyOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticle, setAllArticle] = useState([]);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const articleInLocaleStorage = JSON.parse(localStorage.getItem("articles"));

    if (articleInLocaleStorage) {
      setAllArticle(articleInLocaleStorage);
    }
  }, [article.summary]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getSummary(article.url, (data) => {
      if (data) {
        const newArticle = {
          ...article,
          url: article.url,
          summary: data.summary,
        };
        const updateAllArticle = [...allArticle, newArticle];

        setArticle({ ...article, summary: data.summary });
        localStorage.setItem("articles", JSON.stringify(updateAllArticle));
      }
    });
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    <section className="w-full max-w-xl mt-12">
      <div className="flex flex-col w-full gap-2">
        <form
          action=""
          className="relative flex items-center justify-center"
          onSubmit={handleSubmit}
        >
          <BsLink
            className="absolute left-0 ml-3 my-2 text-gray-600"
            size={18}
          />
          <input
            type="url"
            placeholder="Input a URL"
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            value={article.url}
            required
            className="input-url"
          />

          <button
            type="submit"
            className="absolute right-0 w-8 h-full px-3 text-gray-500"
          >
            ↲
          </button>
        </form>

        <div className="max-h-60 overflow-y-auto flex flex-col gap-3 w-full p-1">
          {allArticle?.map((article, index) => (
            <div
              key={`url-${index}`}
              className="bg-white/30 backdrop-blur-sm p-2 rounded-md shadow-md flex items-center gap-3 cursor-pointer"
              onClick={() => setArticle(article)}
            >
              <div onClick={() => handleCopy(article.url)}>
                {copied === article.url ? (
                  <TiTick size={16} className="text-green-500" />
                ) : (
                  <IoCopyOutline size={16} className="text-slate-500" />
                )}
              </div>
              <p className="text-slate-500 text-sm truncate">{article.url}</p>
            </div>
          ))}
        </div>

        {article.summary !== "" ? (
          <div className="border-gray-300 shadow-lg rounded-md bg-white/30 p-4 backdrop-blur-sm mb-8">
            <h1 className="text-slate-700 font-semibold text-lg mb-3">
              Article <span className="blue-gradient">Summary</span>
            </h1>
            <p className="text-slate-700 text-base">{article.summary}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
};
export default Demo;
