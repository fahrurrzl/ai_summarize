import { useState } from "react";
import { BsLink } from "react-icons/bs";
import { useLazyGetSummaryQuery } from "../services/article";
import { loader } from "../assets";
import BoxError from "./BoxError";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      setArticle(newArticle);

      console.log(newArticle);
    }
  };

  console.log({ error });

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
            placeholder="Masukkan URL nya cuy..."
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
          <div className="mb-3">
            <h1 className="text-lg text-slate-600 font-bold">
              Article <span className="blue-gradient">Summary:</span>
            </h1>
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
