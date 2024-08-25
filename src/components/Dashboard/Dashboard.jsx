//components :
import Menu from "./Menu";

import { useContext, useEffect } from "react";
import { dialogContext } from "../../context/AooProvider";
import RenderContent from "./RenderContent";
import { useNavigate } from "react-router-dom";

import Tostify from "./Tostify";
import { refresIt, getDatawithToken } from "../../services/api.js";

const Dashboard = () => {
  const {
    currMenuClick,
    setCurrMenuClick,

    setLoginData,
    setUserData,
  } = useContext(dialogContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("refreshToken");
    if (!token) {
      navigate("/");
      return;
    } else {
      const getUserdata = async () => {
        let res = await getDatawithToken({ token: token });
        console.log(res);
        setUserData({ username: res.username });
        setLoginData({ username: res.username });
      };
      getUserdata();
    }
  }, []);

  const refreshMyToken = async () => {
    let res = await refresIt({
      refreshToken: localStorage.getItem("refreshToken"),
    });
    console.log(res);
    localStorage.setItem("token", res.accessToken);
  };

  useEffect(() => {
    // Set up a token refresh interval
    const refreshInterval = setInterval(() => {
      refreshMyToken();
    }, 8 * 60 * 1000); // Refresh token every 8 minutes

    return () => clearInterval(refreshInterval); // Clean up on component unmount
  }, []);

  return (
    <div className="max-w-[100vw] dashboard-wrapper max-h-[100vh] w-[100vw] h-[100vh]  bg-[#444444] flex">
      <Tostify />
      <div className="slidbar dashboard-slidbar-wrapper bg-[#FFE963] h-[100vh] w-[20%] rounded-tr-3xl rounded-br-3xl p-[10px] flex justify-center">
        <Menu setCurrMenuClick={setCurrMenuClick} />
      </div>

      <RenderContent currMenuClick={currMenuClick} />
    </div>
  );
};

export default Dashboard;
