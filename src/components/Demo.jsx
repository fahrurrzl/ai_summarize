import { useEffect, useState } from "react";
import { BsLink } from "react-icons/bs";
import { useLazyGetSummaryQuery } from "../services/article";
import { loader } from "../assets";
import BoxError from "./BoxError";
import { IoCopyOutline } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";
import { IoIosClose } from "react-icons/io";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticle, setAllArticle] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const allArticleFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (allArticleFromLocalStorage) {
      setAllArticle(allArticleFromLocalStorage);
    }
  }, []);

  const handleCopy = (articleUrl) => {
    navigator.clipboard.writeText(articleUrl);
    setCopied(articleUrl);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      setArticle(newArticle);
    }
  };

  const handleClose = () => {
    setArticle({
      url: "",
      summary: "",
    });
  };

  return (
    <section className="w-full max-w-xl mt-12">
      <div className="flex flex-col w-full gap-2">
        <form
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
            className="input-url peer"
          />

          <button
            type="submit"
            className="absolute right-3 w-10 text-gray-500 peer-focus:border peer-focus:border-gray-400 rounded-sm"
          >
            ↲
          </button>
        </form>
        {/* Browse url */}
        <div className="max-h-56 p-1 overflow-y-auto wrap-url">
          {allArticle?.map((item, index) => (
            <div
              key={`item-${index}`}
              className="p-2 rounded-sm text-sm bg-white/40 backdrop-blur-sm text-slate-500 truncate mb-2"
              onClick={() => setArticle(item)}
            >
              <button
                type="button"
                className="text-slate-500 flex items-center justify-center gap-2"
                onClick={() => handleCopy(item.url)}
              >
                {copied === item.url ? (
                  <SiTicktick size={18} />
                ) : (
                  <IoCopyOutline size={18} />
                )}

                {item.url}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Result */}
      {isFetching ? (
        <div className="w-full flex items-center justify-center my-10">
          <img src={loader} alt="loader" className="w-12" />
        </div>
      ) : error ? (
        <BoxError message={error?.data.error} />
      ) : article?.summary ? (
        <div className="box-summary">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-lg text-slate-600 font-bold">
              Article <span className="blue-gradient">Summary:</span>
            </h1>
            <button
              type="button"
              className="p-1 text-red-500 hover:text-red-600 transition-all duration-300"
              onClick={handleClose}
            >
              <IoIosClose size={24} />
            </button>
          </div>
          <article>
            <p className="text-slate-500 leading-relaxed text-pretty break-words text-base sm:text-lg">
              {article.summary}
            </p>
          </article>
        </div>
      ) : null}
    </section>
  );
};
export default Demo;
