import { useContext, useEffect, React } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import ReactGA from "react-ga4";

import { dialogContext } from "../../context/AooProvider.jsx";
import { toast } from "react-toastify";
import LoaderToggle from "./Loader.jsx";

const dialogStyle = {
  width: "100vw",
  height: "90vh",
  maxWidth: "80vw",
  maxHeight: "none",
  display: "flex",
  justifyContent: "center",
  // alignItems: "center",
  backgroundColor: "#ffffff",
};

const dialogMobileStyle = {
  width: "450px",
  padding: "0px",
  border: "2px solid green",
  overflowX: "hidden",
};
const InvoicePrintPreview = ({
  invoiceData,
  setPrintDialog,
  printDialog,
  subTotal,
  total,
  discount,
  items,
}) => {
  const { classChe, setClass, setLoading } = useContext(dialogContext); // Default color
  useEffect(() => {
    ReactGA.event({
      category: "Invoice Print Preview",
      action: `preview page`,
      label: "print",
    });
  }, []);

  const downloadPDF = async () => {
    setLoading(true);
    console.log(invoiceData);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/download-pdf`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            invoiceData: invoiceData,
            subTotal: subTotal,
            discount: discount,
            classChe: classChe,
          }),
        }
      );

      if (!response) {
        toast.error("Network response was not ok", {
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
      if (response.status === 200) {
        setLoading(false);
      }

      const blob = await response.blob();
      // if (blob.type !== "application/pdf") {
      //   throw new Error("Received file is not a PDF");
      // }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${invoiceData.company}.pdf`;
      a.click();
      toast.success("PDF Downloaded, Check in your file", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      window.URL.revokeObjectURL(url); // Clean up
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
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
    <Dialog
      open={printDialog}
      onClose={() => setPrintDialog(false)}
      PaperProps={{
        sx: {
          ...dialogStyle,
          ...(window.innerWidth <= 768 && dialogMobileStyle),
        },
      }}
      fullWidth
      maxWidth="xl"
    >
      <DialogContent>
        <div className="flex w-full h-full print-wrapper">
          <LoaderToggle />
          <div className="color-wrapper w-1/4 p-8 overflow-y-scroll border-2 border-[#444444] border-opacity-30">
            <div className="flex flex-col space-y-2">
              <div className="hover:border-[#444444] color-btn-wrapper hover:border-opacity-30 hover:border-2 rounded-md">
                <Button
                  variant="contained"
                  // color="error"
                  style={{
                    padding: "2px",
                    background: "white",
                  }}
                  onClick={() => setClass("pink-yellow")}
                >
                  <img
                    src=" /invoiceAssets/pink-yellow.jpg"
                    alt="pink-yellow"
                  />
                </Button>
              </div>
              <div className="hover:border-[#444444] hover:border-opacity-30 hover:border-2 rounded-md">
                <Button
                  variant="contained"
                  // color="error"
                  style={{
                    padding: "2px",
                    background: "white",
                  }}
                  onClick={() => setClass("blue-purple")}
                >
                  <img
                    src=" /invoiceAssets/blue-purple.jpg"
                    alt="pink-yellow"
                  />
                </Button>
              </div>
              <div className="hover:border-[#444444] hover:border-opacity-30 hover:border-2 rounded-md">
                <Button
                  variant="contained"
                  // color="error"
                  style={{
                    padding: "2px",
                    background: "white",
                  }}
                  onClick={() => setClass("cloud-yellow")}
                >
                  <img
                    src=" /invoiceAssets/cloud-yellow.jpg"
                    alt="pink-yellow"
                  />
                </Button>
              </div>
              <div className="hover:border-[#444444] hover:border-opacity-30 hover:border-2 rounded-md">
                <Button
                  variant="contained"
                  // color="error"
                  style={{
                    padding: "2px",
                    background: "white",
                  }}
                  onClick={() => setClass("purple-red")}
                >
                  <img src=" /invoiceAssets/purple-red.jpg" alt="pink-yellow" />
                </Button>
              </div>
              <div className="hover:border-[#444444] hover:border-opacity-30 hover:border-2 rounded-md">
                <Button
                  variant="contained"
                  // color="error"
                  style={{
                    padding: "2px",
                    background: "white",
                  }}
                  onClick={() => setClass("black-yellow")}
                >
                  <img
                    src=" /invoiceAssets/black-yelllow.jpg"
                    alt="pink-yellow"
                  />
                </Button>
              </div>
              <div className="hover:border-[#444444] hover:border-opacity-30 hover:border-2 rounded-md">
                <Button
                  variant="contained"
                  // color="error"
                  style={{
                    padding: "2px",
                    background: "white",
                  }}
                  onClick={() => setClass("red-orange")}
                >
                  <img src=" /invoiceAssets/red-orange.jpg" alt="pink-yellow" />
                </Button>
              </div>
              <div className="hover:border-[#444444] hover:border-opacity-30 hover:border-2 rounded-md">
                <Button
                  variant="contained"
                  // color="error"
                  style={{
                    padding: "2px",
                    background: "white",
                  }}
                  onClick={() => setClass("orange")}
                >
                  <img src=" /invoiceAssets/orange.jpg" alt="pink-yellow" />
                </Button>
              </div>
              <div className="hover:border-[#444444] hover:border-opacity-30 hover:border-2 rounded-md">
                <Button
                  variant="contained"
                  // color="error"
                  style={{
                    padding: "2px",
                    background: "white",
                  }}
                  onClick={() => setClass("blue")}
                >
                  <img src=" /invoiceAssets/blue.jpg" alt="pink-yellow" />
                </Button>
              </div>
            </div>
          </div>
          <div className="print-preview w-3/4 p-4 overflow-y-scroll border-[#444444] border-l-0 border-opacity-30 border-2">
            <div className="invoice">
              <div className={`top w-[100%] h-[30px]  ${classChe}`}></div>
              <div className="header text-right  mt-[70px] flex items-center justify-around ">
                <div className="circle flex space-x-[-30px]  ml-10 w-fit">
                  <div
                    className={`w-[100px] h-[100px] ${classChe} opa bg-opacity-30 rounded-[50%]`}
                  ></div>
                  <div
                    className={`w-[100px] h-[100px] ${classChe} opa bg-opacity-30 rounded-[50%]`}
                  ></div>
                  <div
                    className={`w-[100px] h-[100px] ${classChe} opa bg-opacity-30 rounded-[50%]`}
                  ></div>
                </div>

                <h1 className="text-[80px] mr-[50px] font-semibold w-fit">
                  INVOICE
                </h1>
              </div>
              <div className="details flex justify-around gap-[50px] p-[40px] mt-[70px]">
                <div>
                  <p className="font-semibold">INVOICE TO :</p>
                  <p className="text-blue-600">
                    {invoiceData.company.toUpperCase()}
                  </p>
                  <div className="hr h-[2px] w-[50px] bg-[#444444]"></div>
                </div>
                <div className="flex-row justify-center items-center">
                  <p className="font-semibold">
                    Date :{" "}
                    {new Date(invoiceData.createdAt).toLocaleDateString()}
                  </p>

                  <p className="">Mobile Number : {invoiceData.mobile}</p>
                </div>
                <div>
                  <p className="font-semibold">TOTAL DUE :</p>
                  <p className="font-bold text-violet-600">
                    INR : {invoiceData.totalAmount}
                  </p>
                </div>
              </div>
              <div className="items w-[80%] m-auto">
                <table className="w-[100%]">
                  <th
                    className={`text-white ${classChe} h-[40px] flex justify-between p-5 items-center rounded-sm w-[100%]`}
                  >
                    <td className="">Description</td>
                    <div className="flex gap-[150px] ">
                      <td>Qty</td>
                      <td>Price</td>
                      <td>Total</td>
                    </div>
                  </th>
                  {items.map((itt, index) => (
                    <tr
                      key={index}
                      className={`text-black border-t-2 border-b-2 mt-2 mb-2 border-[#444444] border-opacity-30 h-[40px] flex justify-between p-5 items-center rounded-sm w-[100%]`}
                    >
                      <td className="font-semibold">{itt.itemName}</td>
                      <div className="flex gap-8  ml-[70px] text-left">
                        <td className=" w-[150px] pl-1">{itt.quantity}</td>
                        <td className=" w-[90px] ">{itt.price}</td>
                        <td className=" w-[100px] pl-[62px]">{itt.amount}</td>
                      </div>
                    </tr>
                  ))}
                </table>
                <div className="hr h-[1.5px] mt-1 w-[] bg-[#444444] bg-opacity-70"></div>
                <div className="p-5 flex justify-between relative ">
                  <div className="payment">
                    <p className="text-xl font-semibold">Payment Method</p>
                    <br />
                    <p>Bank Name: Kotal Mahindra Bank</p>
                    <p>Account No: 1234567890</p>
                  </div>
                  <div className="calcu absolute left-[457px] w-[40%]">
                    <div className="up flex gap-[100px]">
                      <div className="text-right ">
                        <p>Sub-Total :</p>
                        <p>Discount :</p>
                        <p>Tax :</p>
                      </div>
                      <div className=" text-left">
                        <p>{subTotal} </p>
                        <p>{discount}%</p>
                        <p>18%</p>
                      </div>
                    </div>
                    <div
                      className={`down mt-2 pr-9 w-[85%]  flex justify-between text-white ${classChe} rounded-sm h-[40px] items-center  `}
                    >
                      <div className=" w-[100%] ">
                        <p className="ml-2 font-semibold  pl-9">
                          Total : &nbsp; &nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          {total}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className="footer mt-4 p-5 flex justify-between ">
                  <div className="left w-1/2">
                    <p className="text-xl font-semibold">Terms & Conditions</p>
                    <br />
                    <p>
                      Please send payment within 30 days of receiving this
                      invoice there will be 10% interest charge per month on
                      late invoice.
                    </p>
                  </div>
                  <div className="right w-1/2 relative ">
                    <div className="absolute top-[70px] left-[200px]">
                      <p className="text-xl  font-semibold">
                        {invoiceData.company.toUpperCase()}
                      </p>
                      <p>Administrator</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`top w-[100%] mt-11 h-[30px] ${classChe} `}></div>
            </div>
          </div>
        </div>
      </DialogContent>
      <div className="flex download-wrapper justify-between items-center  p-4">
        <div className="btn flex relative ml-5 gap-3">
          <Button
            variant="contained"
            // color="error"
            style={{
              padding: "2px",
              background: "white",
              width: "100px",
              height: "40px",
              background: `#444444`,
              color: "white",
            }}
            onClick={() => downloadPDF()}
          >
            Download
          </Button>
          <Button
            variant="contained"
            // color="error"
            style={{
              padding: "2px",
              background: "white",
              width: "100px",
              height: "40px",
              color: "black",
              border: "1.5px solid #444444",
            }}
            onClick={() => setPrintDialog(false)}
          >
            Cancle
          </Button>
        </div>
        <DialogTitle>
          <span className="text-print">
            Select Print Layout & Download as PDF
          </span>
        </DialogTitle>
      </div>
    </Dialog>
  );
};

export default InvoicePrintPreview;
