import { useContext, React } from "react";
import { dialogContext } from "../context/AooProvider";

const Navbar = () => {
  const { setLoginOpen, setSignUpOpen } = useContext(dialogContext);

  return (
    <nav className="h-[8vh] bg-[#444444] navbar w-[100vw] flex items-center justify-between p-5">
      <h1 className="text-white ml-4 text-3xl">INMAT</h1>
      <div className="p-5 flex gap-2">
        <button
          className="w-[100px] h-[35px] login text-white font-semibold border-2 rounded-2xl"
          onClick={() => setLoginOpen(true)}
        >
          Login
        </button>
        <button
          className="w-[100px] bg-white h-[35px] signUp font-semibold border rounded-2xl"
          onClick={() => setSignUpOpen(true)}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
