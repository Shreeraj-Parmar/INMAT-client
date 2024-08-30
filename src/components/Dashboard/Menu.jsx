//icons :
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FilterListIcon from "@mui/icons-material/FilterList";
import SecurityIcon from "@mui/icons-material/Security";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate } from "react-router-dom";
import { useContext, React } from "react";
import { dialogContext } from "../../context/AooProvider";
import { useMediaQuery } from "@mui/material";

const Menu = ({ setCurrMenuClick }) => {
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  const { activeButton, setActiveButton, drawerOpen, setDrawerOpen } =
    useContext(dialogContext);
  const navigate = useNavigate();
  const handleClick = (menu) => {
    setCurrMenuClick(menu);
    setActiveButton(menu);
    if (isSmallScreen) setDrawerOpen(!drawerOpen);
  };
  const logoutClick = () => {
    localStorage.removeItem("token");
    // localStorage.removeItem("refreshToken");
    navigate("/");
  };
  return (
    <div className="wrapper menu-wrapper">
      <div className="up flex-row menu-btns-wrapper space-y-2 w-[100%] mt-[40px] ">
        <div
          className={`cursor-pointer menu-btn-wrapper ${
            activeButton === "create"
              ? "text-blue-600 bg-[#1B59F8] bg-opacity-[20%]"
              : ""
          } hover:bg-[#1B59F8] hover:bg-opacity-[20%] w-[260px] h-[50px]  rounded-md p-3 flex justify-start gap-5 items-center 
         `}
          onClick={() => handleClick("create")}
        >
          <AddCircleOutlineIcon
            style={{ fontSize: "30px", color: "#444444" }}
          />
          <button
            className={`menu-btn ${
              activeButton === "create" ? "text-blue-600" : ""
            } font-semibold  rounded-lg `}
          >
            Create New Invoice
          </button>
        </div>
        <div
          className={`cursor-pointer  menu-btn-wrapper ${
            activeButton === "filter"
              ? "text-blue-600 bg-[#1B59F8] bg-opacity-[20%]"
              : ""
          }   hover:bg-[#1B59F8] hover:bg-opacity-[20%] w-[260px] h-[50px]  rounded-md p-3  flex justify-start gap-5 items-center `}
          onClick={() => handleClick("filter")}
        >
          <FilterListIcon style={{ fontSize: "30px", color: "#444444" }} />
          <button
            className={`menu-btn ${
              activeButton === "filter" ? "text-blue-600" : ""
            } font-semibold  rounded-lg `}
          >
            Filter Invoice
          </button>
        </div>
        <div
          className={`cursor-pointer menu-btn-wrapper  ${
            activeButton === "profile"
              ? "text-blue-600 bg-[#1B59F8] bg-opacity-[20%]"
              : ""
          }  hover:bg-[#1B59F8] hover:bg-opacity-[20%] w-[260px] h-[50px]  rounded-md p-3 flex justify-start gap-5 items-center `}
          onClick={() => handleClick("profile")}
        >
          <AccountCircleIcon style={{ fontSize: "30px", color: "#444444" }} />
          <button
            className={`menu-btn ${
              activeButton === "profile" ? "text-blue-600" : ""
            } font-semibold  rounded-lg `}
          >
            Profile
          </button>
        </div>
        <div
          className={`cursor-pointer menu-btn-wrapper ${
            activeButton === "mfa"
              ? "text-blue-600 bg-[#1B59F8] bg-opacity-[20%]"
              : ""
          }  hover:bg-[#1B59F8] hover:bg-opacity-[20%] w-[260px] h-[50px]  rounded-md p-3 flex justify-start gap-5 items-center `}
          onClick={() => handleClick("mfa")}
        >
          <SecurityIcon style={{ fontSize: "30px", color: "#444444" }} />
          <button
            className={`menu-btn ${
              activeButton === "mfa" ? "text-blue-600" : ""
            } font-semibold  rounded-lg `}
          >
            Enable Two Factor Auth
          </button>
        </div>
      </div>
      <div className="down menu-2-wrapper mt-[50px]">
        <h3 className="mb-3 text-2xl text-yellow-900 font-semibold ml-[23px]">
          Support
        </h3>
        <div className="up flex-row menu-2-btns-wrapper space-y-2 w-[100%] h-[100%]">
          <div
            className={`cursor-pointer menu-2-btn-wrapper ${
              activeButton === "start"
                ? "text-blue-600 bg-[#1B59F8] bg-opacity-[20%]"
                : ""
            }  hover:bg-[#1B59F8] hover:bg-opacity-[20%] w-[260px] h-[50px]  rounded-md p-3 flex justify-start gap-5 items-center `}
            onClick={() => handleClick("start")}
          >
            <EmojiObjectsIcon style={{ fontSize: "30px", color: "#444444" }} />
            <button
              className={` menu-btn ${
                activeButton === "start" ? "text-blue-600" : ""
              } font-semibold menu-btn rounded-lg `}
            >
              Getting Strated
            </button>
          </div>
        </div>
        <div className="up flex-row menu-2-btns-wrapper space-y-2 w-[100%] h-[100%]">
          <div
            className={`cursor-pointer mt-2 menu-2-btn-wrapper ${
              activeButton === "pr"
                ? "text-blue-600 bg-[#1B59F8] bg-opacity-[20%]"
                : ""
            }  hover:bg-[#1B59F8] hover:bg-opacity-[20%] w-[260px] h-[50px]  rounded-md p-3 flex justify-start gap-5 items-center `}
            onClick={() => handleClick("pr")}
          >
            <ArticleIcon style={{ fontSize: "30px", color: "#444444" }} />
            <button
              className={` menu-btn ${
                activeButton === "pr" ? "text-blue-600" : ""
              } font-semibold menu-btn rounded-lg `}
            >
              Project Report
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => logoutClick()}
        className="font-semibold menu-logout-btn rounded-lg hover:bg-gray-700 w-[80px] p-2 mt-[190px] ml-[75px] text-center h-[40px] bg-[#444444] text-white "
      >
        Logout
      </button>
    </div>
  );
};

export default Menu;
