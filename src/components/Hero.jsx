import { FaGithub } from "react-icons/fa";
import { LuFileCog } from "react-icons/lu";

const Hero = () => {
  return (
    <header className="flex flex-col items-center justify-center w-full pt-3">
      <nav className="flex items-center justify-between w-full mb-16">
        <div className="flex items-center gap-2">
          <LuFileCog size={24} className="text-blue-500" />
          <h1 className="font-bold text-xl text-gray-600">Ringks</h1>
        </div>
        <button className="btn-github">
          <FaGithub size={18} />
          GitHub
        </button>
      </nav>

      <h1 className="head-text">
        Ringkas Artikel mu dengan <br className="max-md:hidden" />
        <span className="blue-gradient text-4xl">OpenAI GPT-4</span>
      </h1>
      <h2 className="max-w-xl text-gray-600 mt-4 text-lg sm:text-xl text-center mt-5">
        Sederanakan bacaan mu dengan Ringkas, sebuah ringkasan artikel
        open-source yang merubah artikel panjang menjadi jelas dan ringkas.
      </h2>
    </header>
  );
};
export default Hero;
