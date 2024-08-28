import { useContext, useState, useEffect, React } from "react";
import { toast } from "react-toastify";

import Dialog from "@mui/material/Dialog";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { dialogContext } from "../context/AooProvider";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";
import {
  getAllUsers,
  getMFAEmail,
  loginCheckUp,
  checkIsMFA,
} from "../services/api.js";

import { useNavigate } from "react-router-dom";
import Tostify from "./Dashboard/Tostify.jsx";
import LoaderToggle from "./Dashboard/Loader.jsx";

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

const dialogMobileStyle = {
  width: "380px",
  overflowX: "hidden",
};

const Login = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  const {
    loginOpen,
    setLoginOpen,
    setSignUpOpen,
    setLoading,
    loginData,
    setLoginData,
    setIsLogin,
    setUserData,
  } = useContext(dialogContext);

  const navigate = useNavigate();
  const [mfaDialog, setMfaDialog] = useState(false);
  const [mfaEmail, setMfaEmail] = useState("");
  const [mfaDigit, setMfaDigit] = useState(null);
  const [digits, setDigits] = useState(null);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    setUserData(loginData);
  };

  const handleLoginClick = async (e) => {
    setLoading(true);
    ReactGA.event({
      category: "User Login",
      action: ` ${loginData.username} Clicked on Login Button`,
      label: "Login Button",
    });
    e.preventDefault();
    let response = await loginCheckUp(loginData);
    // console.log("this is tokens data", response.data);
    if (response && response.status === 200) {
      let isMFAis = await checkIsMFA({ username: loginData.username });

      if (isMFAis.status === 200) {
        let emailResponse = await getMFAEmail({ username: loginData.username });
        console.log("email responce is", emailResponse);
        setMfaEmail(emailResponse.email);
        setMfaDigit(emailResponse.digit);

        setLoginOpen(false);
        setMfaDialog(true);
      } else {
        console.log("login successful");
        setIsLogin(true);
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        toast.success(`Welcome Back ${loginData.username}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          setLoginOpen(false);
          navigate("/dashboard");
        }, 3000);
      }
    } else {
      console.log("incorrect username or password please try again");
    }
    setLoading(false);
    // setLoginData(defalutLoginData);
  };

  const checkDigit = () => {
    ReactGA.event({
      category: "User Login",
      action: ` ${loginData.username} Clicked on Login Button`,
      label: "Verify Mail When Login Button",
    });
    const receivedCode = String(mfaDigit);
    const enteredCode = String(digits);

    if (receivedCode === enteredCode) {
      console.log("login successful");
      setIsLogin(true);
      toast.success(`Welcome Back ${loginData.username}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      ReactGA.event({
        category: "User Login",
        action: ` ${loginData.username} Succcessfull Login with mfa`,
        label: "Login Button",
      });

      setTimeout(() => {
        setMfaDialog(false);
        navigate("/dashboard");
      }, 3000);
    } else {
      toast.error(`Please Enter Correct Digits`, {
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
    <>
      <Tostify />
      <LoaderToggle />
      <Dialog
        open={loginOpen}
        PaperProps={{
          sx: {
            ...dialogStyle,
            ...(window.innerWidth <= 768 && dialogMobileStyle),
          },
        }}
      >
        <div className="bg-[#FFE963] login-wrapper w-[450px] overflow-hidden p-5 rounded-[20px]">
          <div className="flex-row login-content-wrapper text-center mt-[30px]">
            <h2 className="text-3xl login-title text-black text-center m-1 font-">
              Login Here
            </h2>
            <p className="text-sm login-description text-gray-900 text-center m-1">
              every features of on this website is free off cost so don't worry
              & make invoices.
            </p>
            <div className="flex-row login-inputs justify-center text-center mt-[20px]">
              <input
                className=" bg-transparent login-inp border-[#444444] border-2 border-opacity-60  placeholder:text-[#444444] placeholder:text-opacity-80  rounded-[10px] p-2 mt-1 text-center w-[60%]"
                placeholder="Enter username"
                type="text"
                id="username"
                name="username"
                onChange={(e) => handleLoginChange(e)}
                value={loginData.username}
              />
              <input
                className="border-2 border-[#444444] login-inp  bg-transparent border-opacity-60  placeholder:text-[#444444] placeholder:text-opacity-80 rounded-[10px] p-2 mt-1 text-center w-[60%]"
                placeholder="Enter Password"
                type="password"
                id="password"
                name="password"
                onChange={(e) => handleLoginChange(e)}
                value={loginData.password}
              />
            </div>
            <button
              className="border login-btn rounded-md mt-2 w-[100px] h-[40px] bg-black text-white"
              onClick={(e) => handleLoginClick(e)}
            >
              Login
            </button>
            <p className="text-sm login-create text-gray-900 mt-4">
              Create A New Account?&nbsp;
              <a
                className="text-blue-500 signup-link"
                href="#"
                onClick={() => {
                  setLoginOpen(false);
                  setSignUpOpen(true);
                }}
              >
                Sign Up
              </a>
            </p>
          </div>
          <button
            className="absolute login-cancle top-4 left-[420px]"
            onClick={() => setLoginOpen(false)}
          >
            <ClearOutlinedIcon />
          </button>
        </div>
      </Dialog>
      {/* this is MFA Dialog */}
      <Dialog
        open={mfaDialog}
        PaperProps={{
          sx: {
            ...dialogStyle,
            ...(window.innerWidth <= 768 && dialogMobileStyle),
          },
        }}
      >
        <div className="bg-[#FFE963] login-wrapper w-[450px] overflow-hidden p-5 rounded-[20px]">
          <div>
            <p className="text-[#444444]">
              Check Your {mfaEmail} Email & Enter 6 digit code here
            </p>
            <input
              onChange={(e) => {
                setDigits(e.target.value);
              }}
              className="p-2  w-[300px] text-center bg-transparent border-[#444444] border-2 rounded-sm border-opacity-30 "
              type="number"
              name="digitLogin"
              id="digitLogin"
            />
            <button
              onClick={() => {
                checkDigit();
              }}
              className="rounded-sm bg-[#444444] hover:bg-gray-900 text-white w-[100px] h-[43px]"
            >
              Verify
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Login;
