import { useContext, useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { dialogContext } from "../context/AooProvider";
import { sendNewuser } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";

import { toast } from "react-toastify";
import Tostify from "./Dashboard/Tostify.jsx";

const dialogStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  margin: "auto",
  width: "470px",
  maxHeight: "340px",
  borderRadius: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FFE963",
};

const signUpMobileStyle = {
  width: "380px",
  overflowX: "hidden",
};

const defalutSignUpData = { username: "", password: "" };

const SignUp = () => {
  useEffect(() => {
    ReactGA.event({
      category: "SignUp",
      action: ` open SignUp`,
      label: "Wmobile Drawer",
    });
  }, []);
  const {
    signUpOpen,
    setLoginOpen,
    setSignUpOpen,
    setUserData,
    setLoginData,
    setIsLogin,
  } = useContext(dialogContext);
  const [newUser, setNewUser] = useState(defalutSignUpData);

  const navigate = useNavigate();

  // handle input changes :

  const handleSignUpInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSignUpClick = async () => {
    // console.log(newUser);
    setNewUser(defalutSignUpData);
    let res = await sendNewuser(newUser);
    console.log(res.data);
    if (res.status === 200) {
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      toast.success(`Welcome ${newUser.username} to INMAT`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoginData(newUser);
      setUserData(newUser);
      setIsLogin(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } else {
      toast.error("Username Already Registerd", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Dialog
      open={signUpOpen}
      PaperProps={{
        sx: {
          ...dialogStyle,
          ...(window.innerWidth <= 768 && signUpMobileStyle),
        },
      }}
    >
      <Tostify />
      <div className="bg-[#FFE963] signup-wrapper w-[450px] overflow-hidden p-5 rounded-[20px]">
        <div className="flex-row text-center mt-[30px]">
          <h2 className="text-3xl text-black text-center m-1 font-">
            Create An Account
          </h2>
          <p className="text-sm signup-des text-gray-900 text-center m-1">
            every features of on this website is free off cost so do not worry &
            make invoices. choose username & password to sign up.
          </p>
          <div className="flex-row signup-inps justify-center text-center mt-[20px]">
            <input
              className="border-2 border-[#444444]  bg-transparent border-opacity-60  placeholder:text-[#444444] placeholder:text-opacity-80  rounded-[10px] p-2 mt-1 text-center w-[60%]"
              placeholder="Enter New Username"
              type="text"
              id="username"
              name="username"
              onChange={(e) => handleSignUpInputChange(e)}
              value={newUser.username}
            />
            <input
              className="border-2 border-[#444444]  bg-transparent border-opacity-60  placeholder:text-[#444444] placeholder:text-opacity-80  rounded-[10px] p-2 mt-1 text-center w-[60%]"
              placeholder="Enter New Password"
              type="password"
              id="password"
              name="password"
              onChange={(e) => handleSignUpInputChange(e)}
              value={newUser.password}
            />
          </div>
          <button
            className="border rounded-md mt-2 w-[100px] h-[40px] bg-black text-white"
            onClick={(e) => handleSignUpClick(e)}
          >
            Register
          </button>
          <p className="text-sm text-gray-900 mt-4">
            You Have Already Account?&nbsp;
            <a
              className="text-blue-500"
              href="#"
              onClick={() => {
                setSignUpOpen(false);
                setLoginOpen(true);
              }}
            >
              Login
            </a>
          </p>
        </div>
        <button
          className="absolute top-4 signup-cancle left-[420px]"
          onClick={() => setSignUpOpen(false)}
        >
          <ClearOutlinedIcon />
        </button>
      </div>
    </Dialog>
  );
};

export default SignUp;
