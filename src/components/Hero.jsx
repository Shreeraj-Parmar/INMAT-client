import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import Tostify from "./Dashboard/Tostify";
import LoaderToggle from "./Dashboard/Loader";
import ReactGA from "react-ga4";
import { useEffect, useContext, React } from "react";
import { dialogContext } from "../context/AooProvider";

import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const { loading } = useContext(dialogContext);
  useEffect(() => {
    ReactGA.event({
      category: "HERo",
      action: ` Enter In HEro`,
      label: "HERO",
    });
  }, []);
  return (
    <div className="wrapper-hero bg-[url('/invoiceAssets/hero2.png')] bg-cover h-[92vh] w-[100vw] flex flex-col lg:flex-row gap-10 p-[100px]">
      <Tostify />
      <LoaderToggle />
      <div className="right-hero w-[50%] lg:w-[50%] lg:pr-[0px] lg:mt-[60px] lg:text-left pt-[80px]  pr-[0px] p-[60px]  mt-[60px]">
        <h2 className="text-5xl hero-heading">
          Welocme To Invoice Builder INMAT
        </h2>

        <p className=" text-xl hero-heading-2 mt-5 ml-1">
          Made Your First Invoice in Just 4 Steps :
        </p>
        <ul className="ml-5 mt-3 text-[17px] hero-lists-ul  text-[#444444] font-medium flex-row   ">
          <li className="mt-3 flex gap-2">
            <CheckCircleOutlineOutlinedIcon style={{ color: "#0090ff" }} />
            Login/SignUp
          </li>
          <li className="mt-3 flex gap-2">
            <CheckCircleOutlineOutlinedIcon style={{ color: "#0090ff" }} /> Fill
            Your Business details
          </li>
          <li className="mt-3 flex gap-2">
            <CheckCircleOutlineOutlinedIcon style={{ color: "#0090ff" }} /> Fill
            Customer Details
          </li>
          <li className="mt-3 flex gap-2">
            <CheckCircleOutlineOutlinedIcon style={{ color: "#0090ff" }} />
            Print as PDF in Multiple Colors
          </li>
        </ul>
        <button
          className="PR w-[200px] h-[40px] text-white bg-[#444444] rounded-3xl mt-3"
          onClick={() => {
            navigate("/pr");
          }}
        >
          View Project Report
        </button>
      </div>
      <div className="left-hero w-[50%] mr-[100px]"></div>
    </div>
  );
};

export default Hero;
