//components :
import React from "react";
import DrawerCompo from "./Drawer";
import CreateInvoice from "./CreateInvoice";
import Filter from "./Filter";
import Profile from "./Profile";
import MultiFactor from "./MultiFactor";
import GetStart from "./GetStart";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { dialogContext } from "../../context/AooProvider";

const RenderContent = ({ currMenuClick }) => {
  const { drawerOpen, setDrawerOpen } = useContext(dialogContext);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <DrawerCompo open={drawerOpen} toggleDrawer={toggleDrawer} />
      <div className="max-w-[80%] dashboard-right-wrapper max-h-[99%] w-[80%] h-[99%] ml-2 mr-2 p-[50px] rounded-tl-3xl rounded-bl-3xl rounded-md bg-[#d9d9d9]">
        <div className="mobile-menu-icon hidden">
          <MenuIcon
            sx={{ fontSize: 40, cursor: "pointer" }}
            onClick={toggleDrawer}
          />
        </div>
        {/* Render the selected content based on currMenuClick */}
        {currMenuClick === "create" && <CreateInvoice />}
        {currMenuClick === "filter" && <Filter />}
        {currMenuClick === "profile" && <Profile />}
        {currMenuClick === "mfa" && <MultiFactor />}
        {currMenuClick === "start" && <GetStart />}
      </div>
    </>
  );
};

export default RenderContent;
