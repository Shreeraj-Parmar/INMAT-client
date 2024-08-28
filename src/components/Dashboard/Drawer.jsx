import { styled, Drawer } from "@mui/material";
import { useContext, useEffect } from "react";
import { dialogContext } from "../../context/AooProvider";
import Menu from "./Menu";
import ReactGA from "react-ga4";

const DrawrWith = styled(Drawer)`
  width: 100px;

  ${"" /* background: #ffe963; */}
`;

const DrawerCompo = ({ open, toggleDrawer }) => {
  useEffect(() => {
    ReactGA.event({
      category: "Mobile Drawer",
      action: ` Some Is In Mobile And Open The Drawer Component`,
      label: "Wmobile Drawer",
    });
  }, []);

  const { setCurrMenuClick } = useContext(dialogContext);

  return (
    <>
      <DrawrWith open={open} onClose={toggleDrawer}>
        <div className=" bg-[#FFE963] h-[100vh] rounded-tr-3xl rounded-br-3xl p-[10px] flex justify-center">
          <Menu setCurrMenuClick={setCurrMenuClick} />
        </div>
      </DrawrWith>
    </>
  );
};

export default DrawerCompo;
