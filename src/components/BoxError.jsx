import { MdErrorOutline } from "react-icons/md";

const BoxError = ({ message }) => {
  return (
    <div className="box-error">
      <span>
        <MdErrorOutline size={24} />
      </span>
      <p className="font-bold">{message}</p>
    </div>
  );
};

export default BoxError;
