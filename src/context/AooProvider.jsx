import { createContext, useState, React } from "react";

export const dialogContext = createContext(null);

const defalutLoginData = { username: "", password: "" };

const AllProvider = ({ children }) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});
  const [allData, setAllData] = useState({});
  const [activeButton, setActiveButton] = useState("create");
  const [currMenuClick, setCurrMenuClick] = useState("create");
  const [classChe, setClass] = useState("pink-yellow");
  const [loginData, setLoginData] = useState(defalutLoginData);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <dialogContext.Provider
      value={{
        loginOpen,
        drawerOpen,
        setDrawerOpen,
        loginData,
        activeButton,
        setActiveButton,
        setLoginData,
        setLoginOpen,
        currMenuClick,
        loading,
        setLoading,
        classChe,
        setClass,
        setCurrMenuClick,
        signUpOpen,
        setSignUpOpen,
        isLogin,
        setIsLogin,
        allData,
        setAllData,
        userData,
        setUserData,
      }}
    >
      {children}
    </dialogContext.Provider>
  );
};

export default AllProvider;
