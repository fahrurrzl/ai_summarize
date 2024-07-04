import { FaGithub } from "react-icons/fa";
import { icon } from "../assets";

const Hero = () => {
  return (
    <header className="flex flex-col items-center justify-center w-full pt-3">
      <nav className="flex items-center justify-between w-full mb-8">
        <div className="flex items-center gap-2">
          <img src={icon} alt="icon" />
          <h1
            className="font-bold text-xl text-gray-600"
            style={{ userSelect: "none" }}
          >
            Ringks
          </h1>
        </div>
        <button
          className="btn-github"
          onClick={() => window.open("https://github.com/rizal57/ai_summarize")}
        >
          <FaGithub size={18} />
          GitHub
        </button>
      </nav>

      <h1 className="head-text">
        Summarize your article with <br className="max-md:hidden" />
        <span className="blue-gradient text-4xl">OpenAI GPT-4</span>
      </h1>
      <h2 className="max-w-xl text-gray-600 text-lg sm:text-xl text-center mt-5">
        Simplify your reading with Ringks, an open-source article summarize.
        that transform lengthy article into clear and concies
      </h2>
    </header>
  );
};
export default Hero;
