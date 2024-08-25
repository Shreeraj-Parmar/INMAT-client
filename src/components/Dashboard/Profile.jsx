import TextField from "@mui/material/TextField";
import { useState, useEffect, useContext } from "react";
import { dialogContext } from "../../context/AooProvider";
import { updateProfile, getData } from "../../services/api.js";
import { toast } from "react-toastify";
import Tostify from "./Tostify.jsx";
import ReactGA from "react-ga4";

const defaultUpdatedData = {
  company: "",
  mobile: "",
  GST: "",
  address: "",
  email: "",
};

const Profile = () => {
  const [updatedProfile, setUpdatedProfile] = useState(defaultUpdatedData);
  const { userData, allData, setAllData } = useContext(dialogContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };
  useEffect(() => {
    ReactGA.event({
      category: "Profile",
      action: `${userData.username} is enter in Profile Compo`,
      label: "Profile component",
    });
  }, []);

  useEffect(() => {
    const getUserAllData = async () => {
      let res = await getData(userData);
      setAllData(res);
      console.log(allData);
    };
    getUserAllData();
  }, [userData, updatedProfile]);

  const handleUpdateClick = async () => {
    // console.log(updatedProfile);
    let res = await updateProfile({
      profile: updatedProfile,
    });
    if (res.status === 200) {
      toast.success("Profile updated..", {
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
        category: "Profile",
        action: `${userData.username} is updated their Profile`,
        label: "Profile component",
      });
    } else if (res.status === 201) {
      console.log("data is ", res.data);
      toast.error(`${res.data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Progile Not Updated, try again!", {
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
    <div className="create-invoice-wrapper  w-[100%] h-[100%] flex-row space-y-2">
      <Tostify />
      <div className="flex create-text-1 justify-center gap-2 mt-2">
        <TextField
          id="company"
          name="company"
          value={updatedProfile.company}
          onChange={(e) => handleChange(e)}
          className="w-[40%] create-text-1-inp"
          label="Your Company Name"
          variant="outlined"
        />
        <TextField
          id="email"
          name="email"
          value={updatedProfile.email}
          onChange={(e) => handleChange(e)}
          className="w-[30%] create-text-1-inp"
          label="Email"
          variant="outlined"
        />
      </div>
      <div className="flex create-text-1 justify-center gap-2">
        <TextField
          id="mobile"
          name="mobile"
          value={updatedProfile.mobile}
          onChange={(e) => handleChange(e)}
          className="w-[30%] create-text-1-inp"
          label="Mobile Number"
          variant="outlined"
        />
        <TextField
          id="GST"
          name="GST"
          value={updatedProfile.GST}
          onChange={(e) => handleChange(e)}
          className="w-[40%] create-text-1-inp"
          label="GST Number"
          variant="outlined"
        />
      </div>
      <div className="flex justify-center ">
        <TextField
          id="address"
          name="address"
          value={updatedProfile.address}
          onChange={(e) => handleChange(e)}
          className="w-[788px] create-text-1-inp"
          label="Company Address"
          variant="outlined"
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => handleUpdateClick()}
          className="w-[100px] h-[40px] bg-[#444444] hover:bg-blue-400 rounded-3xl text-white"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Profile;
