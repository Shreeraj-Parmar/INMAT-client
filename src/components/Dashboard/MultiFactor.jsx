import { useState, useEffect, useContext, React } from "react";
import { Dialog } from "@mui/material";
import {
  checkIsMFA,
  sendDigit,
  trueMFA,
  setUserEmail,
} from "../../services/api";
import { toast } from "react-toastify";
import { dialogContext } from "./../../context/AooProvider";
import Tostify from "./Tostify.jsx";
import ReactGA from "react-ga4";
import LoaderToggle from "./Loader.jsx";

const dialogStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  margin: "auto",
  width: "470px",

  maxHeight: "240px",
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

const MultiFactor = () => {
  const { userData, setLoading } = useContext(dialogContext);
  const [isMFA, setIsMFA] = useState(null);
  const [email, setEmail] = useState("");
  const [verifyDialog, setVerifyDialog] = useState(false);
  const [digit, setDigit] = useState(null);
  const [reciveDigit, setReciveDigit] = useState(null);
  useEffect(() => {
    ReactGA.event({
      category: "MFA",
      action: ` ${userData.username}enter in MFA`,
      label: "it s mfa",
    });
  }, []);
  useEffect(() => {
    const checkIsMFAin = async () => {
      try {
        let res = await checkIsMFA({ username: userData.username });
        console.log(res.status);
        if (res.status === 201) {
          setIsMFA(false);
          return;
        }
        if (res.status === 200) {
          setIsMFA(true);
          toast.success("You Are Already Setup the MFA", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          return;
        }
      } catch (error) {
        console.log(
          `Error While calling ckeckIsMFA & error : ${error.message}`
        );
      }
    };
    checkIsMFAin();
  }, []);

  const handleEmail = async (e) => {
    setEmail(e.target.value);
  };

  const handelClickMail = async () => {
    let res = await sendDigit({
      email: email,
      username: userData.username,
    });
    if (res.status === 201) {
      ReactGA.event({
        category: "MFA",
        action: `${userData.username} mail req send`,
        label: "mail send",
      });
      toast.success("Email sent Succesfully enter 6 digit code", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // console.log(res.data);
      setReciveDigit(res.data.digit);
    } else {
      toast.error("Error While Sending Email...", {
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

  const verifySecret = async () => {
    setLoading(true);
    const receivedCode = String(reciveDigit);
    const enteredCode = String(digit);

    if (receivedCode === enteredCode) {
      try {
        let result = await trueMFA({ username: userData.username });
        if (result.status === 200) {
          setLoading(false);
          toast.success("Verification Done...", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          await setUserEmail({ email: email, username: userData.username });
          setVerifyDialog(false);
          setIsMFA(true);
          ReactGA.event({
            category: "MFA",
            action: `${userData.username} enabled MFA`,
            label: "MFA",
          });
        }
      } catch (error) {
        console.error("Error verifying MFA:", error.message);
        toast.error("Error during MFA verification", {
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
    } else {
      toast.error("Please Check Your 6 digit Code", {
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
    setLoading(false);
  };

  return (
    <div className="mfa-wrapper w-[100%] border-none h-[100%] p-2 flex justify-center ">
      <Tostify />
      <LoaderToggle />
      {!isMFA && (
        <>
          <div className=" mfa-content-wrapper w-[80%] flex-row justify-center  ">
            <h2 className=" text-4xl font-bold text-[#444444] text-center">
              Multi-Factor Authentication using Email
            </h2>
            <div className=" flex justify-center mfa-2 gap-4 mt-8">
              <img
                className="w-[350px] rounded-lg h-[250px]  border-2 border-[#444444] border-opacity-70"
                src="/invoiceAssets/not.jpg"
                alt="this is image say that : please sequre your account"
              />

              <div className=" w-[700px] h-[300px] mfa-text-inp flex-row  space-y-[20px]">
                <div className=" mfa-text">
                  <p className="mt-[50px] mfa-text">
                    Enter Your Email to Enable
                    <p className="text-blue-500">Multi Factor Authentication</p>
                    To Secure Your Account
                  </p>
                </div>

                <div className="mfa-email">
                  <div className="mfa-up">
                    <input
                      className="p-2  w-[300px] text-center bg-transparent border-[#444444] border-2 rounded-sm border-opacity-30 "
                      type="email"
                      placeholder="Enter Your email"
                      name="email"
                      id="email"
                      onChange={(e) => {
                        handleEmail(e);
                      }}
                    />
                    &nbsp;
                    <button
                      onClick={() => {
                        setVerifyDialog(true);
                        handelClickMail();
                      }}
                      className=" rounded-sm send-code bg-[#444444] hover:bg-gray-900 text-white w-[100px] h-[43px]"
                    >
                      Send Code
                    </button>
                    {/* dialog here */}
                    <Dialog
                      open={verifyDialog}
                      PaperProps={{
                        sx: {
                          ...dialogStyle,
                          ...(window.innerWidth <= 768 && dialogMobileStyle),
                        },
                      }}
                    >
                      <div className="bg-[#FFE963] mail-dialog-wrapper w-[450px] overflow-hidden p-5 rounded-[20px]">
                        <div className="mail-wra">
                          <button
                            className="w-[40px] mail-dialog-close h-[40px] text-2xl left-[420px] absolute top-0"
                            onClick={() => setVerifyDialog(false)}
                          >
                            x
                          </button>
                          <p className="text-center">
                            Check Your Mail account & end Enter 6 Digit
                            Verification Code here
                          </p>
                          <input
                            className="p-2 mt-2 mail-input placeholder:text-[#444444]  w-[300px] text-center bg-transparent border-[#444444] border-2 rounded-sm border-opacity-30 "
                            type="number"
                            placeholder="Enter 6 digit Code"
                            name="digit"
                            id="digit"
                            onChange={(e) => {
                              setDigit(e.target.value);
                            }}
                          />
                          &nbsp;
                          <button
                            onClick={() => {
                              verifySecret();
                              // console.log(digit);
                            }}
                            className=" rounded-sm bg-[#444444] hover:bg-gray-900 text-white btn-verify w-[100px] h-[43px]"
                          >
                            {" "}
                            Verify
                          </button>
                        </div>
                      </div>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {isMFA && (
        <>
          <div className="  w-[80%] flex-row justify-center mfa-verify-true ">
            <div>
              <p className="text-3xl text-center text-[#444444]">
                Your MFA is Done Thankyou... , now You are Secure
              </p>
            </div>
            <div>
              <img
                className="w-[100%] h-[50%] rounded-lg mt-1 "
                src="/invoiceAssets/secure.jpg"
                alt="you account is secure"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MultiFactor;
