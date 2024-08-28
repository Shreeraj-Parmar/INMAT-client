//components :
import Menu from "./Menu";

import { useContext, useEffect, React } from "react";
import { dialogContext } from "../../context/AooProvider";
import RenderContent from "./RenderContent";
import { useNavigate } from "react-router-dom";

import Tostify from "./Tostify";
import { refresIt, getDatawithToken } from "../../services/api.js";
import LoaderToggle from "./Loader.jsx";

const Dashboard = () => {
  const {
    currMenuClick,
    setCurrMenuClick,

    setLoginData,
    setUserData,
    setLoading,
  } = useContext(dialogContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
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
    setLoading(false);
  }, []);

  const refreshMyToken = async () => {
    setLoading(true);
    let res = await refresIt({
      refreshToken: localStorage.getItem("refreshToken"),
    });
    console.log(res);
    localStorage.setItem("token", res.accessToken);
    setLoading(false);
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
      <LoaderToggle />
      <div className="slidbar dashboard-slidbar-wrapper bg-[#FFE963] h-[100vh] w-[20%] rounded-tr-3xl rounded-br-3xl p-[10px] flex justify-center">
        <Menu setCurrMenuClick={setCurrMenuClick} />
      </div>

      <RenderContent currMenuClick={currMenuClick} />
    </div>
  );
};

export default Dashboard;
