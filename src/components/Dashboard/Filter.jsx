import { useState, useEffect, useContext } from "react";
import { getInvoiceData, updateInvoices } from "../../services/api.js";
import { dialogContext } from "../../context/AooProvider.jsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Tostify from "./Tostify.jsx";
import ReactGA from "react-ga4";

const dialogStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  padding: "10px",
  margin: "auto",
  width: "700px",
  maxHeight: "200px",
  //   maxWidth: "700px",
  borderRadius: "5px",
  display: "flex",
  background: "transparent",
  backgroundOpacity: "50%",

  alignItems: "center",
  backgroundColor: "#FFE963",
};
const dialogMobileStyle = {
  width: "380px",
  overflowX: "hidden",
};

const Filter = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  // const [hoo, setHoo] = useState(false);
  const { userData, allData, classChe } = useContext(dialogContext);

  const [deletePop, setDeletePop] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  useEffect(() => {
    ReactGA.event({
      category: "Filter invoice",
      action: `${userData.username} is enter on Filter Compo`,
      label: "Filter Invoice Component",
    });
  }, []);
  // Handle focus event to show ArrowBackIcon
  const handleFocus = () => {
    setIsSearching(true);
  };

  // Handle blur event to show SearchIcon
  const handleBlur = () => {
    setIsSearching(false);
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      let res = await getInvoiceData(userData);
      setInvoices(res);
      setFilteredInvoices(res);
      console.log(invoices);
    };

    fetchInvoices();
  }, [deletePop, userData.username]);

  const handleDeleteInvoice = async (id) => {
    let filtred = invoices.filter((inv) => inv._id !== id);
    setInvoices(filtred);
    ReactGA.event({
      category: "Filter invoice",
      action: `${userData.username} want to delete invoice`,
      label: "Delete Invoice",
    });
    //api :
    let res = await updateInvoices(invoiceToDelete);
    if (res.status === 200) {
      toast.success("Invoice Deleted Successfully..", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      const fetchInvoices = async () => {
        let res = await getInvoiceData(userData);
        setInvoices(res);
        setFilteredInvoices(res);
        console.log(invoices);
      };

      fetchInvoices();
    } else {
      toast.error("Not Deleterd ! Try Again", {
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
    setDeletePop(false);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();

    let filterInvoice = invoices.filter((invoice) => {
      return (
        (invoice.company &&
          invoice.company.toLowerCase().includes(searchValue)) ||
        (invoice.email && invoice.email.toLowerCase().includes(searchValue)) ||
        (invoice.mobile &&
          invoice.mobile.toLowerCase().includes(searchValue)) ||
        (invoice.GST && invoice.GST.toLowerCase().includes(searchValue))
      );
    });
    setFilteredInvoices(filterInvoice); // Update the filtered invoices state
  };

  const printAllData = async () => {
    console.log(invoices);
    ReactGA.event({
      category: "Filter invoice",
      action: `${userData.username} is Print All The Invoices`,
      label: "Print All Data",
    });
    console.log(allData);
    try {
      const response = await fetch("http://localhost:8000/download-all-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          invoices: invoices,
          username: userData.username,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        toast.success("All invoice PDF Downloaded, Check in your file", {
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

      const blob = await response.blob();
      if (blob.type !== "application/pdf") {
        throw new Error("Received file is not a PDF");
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "All-Invoice.pdf";
      a.click();
      ReactGA.event({
        category: "Filter invoice",
        action: `${userData.username} downloaded all pdf`,
        label: "Filter Invoice Component",
      });
      window.URL.revokeObjectURL(url); // Clean up
    } catch (error) {
      toast.error("Somthing Error Please Check again!", {
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

  const printOne = async (id) => {
    ReactGA.event({
      category: "Filter invoice",
      action: `${userData.username} download pdf`,
      label: "Filter Invoice Component",
    });
    try {
      const response = await fetch("http://localhost:8000/download-one-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id: id, classChe: classChe }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        toast.success("invoice PDF Downloaded, Check in your file", {
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

      const blob = await response.blob();
      if (blob.type !== "application/pdf") {
        throw new Error("Received file is not a PDF");
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Invoice.pdf";
      a.click();
      ReactGA.event({
        category: "Filter invoice",
        action: `${userData.username} Download Printed PDF`,
        label: "Filter Invoice Component",
      });
      window.URL.revokeObjectURL(url); // Clean up
    } catch (error) {
      console.error("There was an error downloading the PDF:", error);
    }
  };

  return (
    <div className="wrapper-filter w-[100%] h-[100%] flex-row space-y-2">
      <Tostify />
      <div className="filter-search-wrapper flex justify-center mb-8 items-center">
        <div className="relative flex gap-2">
          {isSearching ? (
            <ArrowBackIcon
              className={`absolute top-[9px] left-[15px] text-[#444444] opacity-90 ${
                isSearching ? "fade-in" : "fade-out"
              }`}
              style={{ fontSize: "30px" }}
              onClick={() => setIsSearching(false)}
            />
          ) : (
            <SearchIcon
              className={`absolute top-[9px] left-[15px] text-[#444444] opacity-90 ${
                !isSearching ? "fade-in" : "fade-out"
              }`}
              style={{ fontSize: "30px" }}
            />
          )}
          <input
            className="w-[500px] h-[44px] pl-[55px] search rounded-md bg-transparent border-[#444444] border-2 p-5 border-opacity-30"
            placeholder="Serarch Here"
            type="text"
            name="search"
            onChange={handleSearch}
            id="search"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>
      <div className="invoice-hade  w-[100%] text-[17px] text-[#444444] h-[44px] flex  items-center p-5  border-b-2 border-[#444444] font-semibold border-opacity-30 ">
        <p className="w-[150px]">Company Name</p>

        <p className=" w-[130px] ml-[190px] mobile-hide  ">Mobile Number</p>
        <p className=" w-[130px] ml-[50px] mobile-hide ">Invoice Amount</p>
        <p className=" w-[100px] ml-[80px] pl-[23px] mobile-hide ">Date</p>
        <p className=" w-[] ml-[110px]  ">Print</p>
        <p className=" w-[10px] ml-[20px]  ">Delete</p>
      </div>

      <div className="overflow-y-scroll h-[75%] w-[100%]">
        <div className="flex-row ml-[30px]  space-y-2">
          {filteredInvoices.map((invoice) => (
            <div
              key={invoice._id}
              className="invoices invoice-hade  w-[97%] text-[16px] text-[#444444] h-[44px] flex justify-between  items-center p-5 border-2 border-[#444444] border-opacity-30 rounded-md"
            >
              <p className="w-[300px] ">{invoice.company}</p>
              <p className="w-[100px]  mobile-hide">{invoice.mobile}</p>

              <p className="w-[150px] ml-[50px] pl-8 mobile-hide">
                {invoice.totalAmount}
              </p>
              <p className="w-[150px] ml-[50px] mobile-hide">
                {new Date(invoice.createdAt).toLocaleDateString()}
              </p>
              <p className="w-[] ml-[30px]">
                <IconButton
                  aria-label="pdf"
                  onClick={() => printOne(invoice._id)}
                >
                  <PictureAsPdfIcon style={{ color: "#7d4fff" }} />
                </IconButton>
              </p>
              <p className="">
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    setInvoiceToDelete(invoice._id); // Set the invoice ID to delete
                    setDeletePop(true);
                  }}
                >
                  <DeleteIcon style={{ color: "#ff3232" }} />
                </IconButton>
                <Dialog
                  open={deletePop}
                  PaperProps={{
                    sx: {
                      ...dialogStyle,
                      ...(window.innerWidth <= 768 && dialogMobileStyle),
                    },
                  }}
                >
                  <div className="flex-row delete-wrapper justify-start p-3">
                    <p className="text-xl t  text-red-700 font-semibold  ">
                      Do You Want To Delete?
                    </p>
                    <p className="text-[#444444] mt-3">
                      if you click delete button than invoice will be delete
                      permanently ,if you don't want than you can click cancle
                      button.
                    </p>
                    <div className="del-btn flex space-x-2 ml-[380px] mt-[30px]">
                      <button
                        onClick={() => setDeletePop(false)}
                        className="w-[80px] h-[35px] bg-[#444444] hover:bg-blue-400 rounded-md text-white"
                      >
                        Cancle
                      </button>
                      <button
                        onClick={() => handleDeleteInvoice(invoiceToDelete)}
                        className="w-[80px] h-[35px] bg-[#444444] hover:bg-red-400 rounded-md text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </Dialog>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="total-revenue top-[655px] fixed font-semibold text-[#444444]">
        Total Revenue :&nbsp;
        {invoices.reduce((acc, curr) => acc + curr.totalAmount, 0)}
      </div>
      <div className="flex printall justify-end relative">
        <button
          className="absolute top-[10px] w-[200px] h-[40px] rounded-md bg-[#444444] text-white hover:bg-gray-600"
          onClick={() => printAllData()}
        >
          Print All Data
        </button>
      </div>
    </div>
  );
};

export default Filter;
