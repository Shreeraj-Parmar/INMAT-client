import { useState, useEffect, useContext, React } from "react";
import { toast } from "react-toastify";

import { dialogContext } from "../../context/AooProvider";
import { sendInvoiceData, getData } from "../../services/api.js";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import InvoicePrintPreview from "./InvoicePrintPreview.jsx";
import Tostify from "./Tostify.jsx";
import ReactGA from "react-ga4";
import LoaderToggle from "./Loader.jsx";

const CreateInvoice = () => {
  // this is event for scroll traking in ga4
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // handleScroll is fun in below
  }, []);
  // import globle staate from the dialogContext
  const { userData, setAllData, setLoading } = useContext(dialogContext);

  // items is arr state var that store invoice items
  const [items, setItems] = useState([
    { item: "", price: "", quantity: "", amount: "" },
  ]);

  // this is scroll event for ga4
  const handleScroll = () => {
    // ReactGa.event() is for traking user events in ga4
    ReactGA.event({
      category: "User",
      action: `${userData.username}Create Invoice Component Scrolled `,
      label: "HomePage",
    });
  };

  // this is sample default invoice data {initialized data in invoiceData}
  const defaultInvoiceData = {
    user: `${userData.username}`, // by default set
    company: "",
    email: "",
    mobile: "",
    GST: "",
    address: "",
    items: items,
    discount: "",
    totalAmount: "",
  };
  // state for store invoice data
  const [invoiceData, setInvoiceData] = useState(defaultInvoiceData);
  // state for open & close print Dialog
  const [printDialog, setPrintDialog] = useState(false);
  // state for calculate subTotal amount in invoice
  const [subTotal, setSubTotal] = useState(0);
  //state for calculate Total amount in invoice
  const [total, setTotal] = useState(0);
  // state for calculate discount in invoice
  const [discount, setDiscount] = useState(0);

  // this is dynamic input field handle function , when click 'Additem' this create input fields for addd new items in invoice
  // it take index,field& value as an arguments.
  const handleItemChange = (index, field, value) => {
    // create new arr name of "newItems" which is copy of items arr.
    const newItems = [...items];
    // console.log(newItems[index][field]);
    // index means each object of items arr.
    newItems[index][field] = value;

    if (field === "price" || field === "quantity") {
      const price = parseFloat(newItems[index].price) || 0;
      const quantity = parseFloat(newItems[index].quantity) || 0;
      newItems[index].amount = price * quantity;
    }

    setItems(newItems);
  };

  useEffect(() => {
    const sub = items.reduce((acc, curr) => acc + curr.amount, 0);
    setSubTotal(sub);
    calculateTotal(sub, discount);
  }, [items, discount]);

  useEffect(() => {
    const getUserAllData = async () => {
      let res = await getData(userData);
      setAllData(res);
    };
    getUserAllData();
  }, [userData, printDialog]);

  const handleAddItem = () => {
    if (items.length === 0) {
      setItems([
        ...items,
        { itemName: "", price: "", quantity: "", amount: "" },
      ]);
    }
    // Check if the last item in the list has empty fields
    const lastItem = items[items.length - 1];
    if (!lastItem.itemName || !lastItem.price || !lastItem.quantity) {
      // If any field is empty, show an error message

      toast.error("Please fill out all fields before adding a new item!", {
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
    } else {
      // Add new item if all fields are filled
      setItems([
        ...items,
        { itemName: "", price: "", quantity: "", amount: "" },
      ]);
    }
  };

  const handleDeleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleInvoiceChange = (e) => {
    let { name, value } = e.target;

    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleDiscountChange = (e) => {
    const discountValue = parseFloat(e.target.value) || 0;

    setDiscount(discountValue);
  };

  const calculateTotal = (sub, discount) => {
    const discountAmount = (sub * discount) / 100;
    const taxAmount = ((sub - discountAmount) * 18) / 100;
    const totalAmount = sub - discountAmount + taxAmount;
    setTotal(totalAmount);
    setInvoiceData((prevData) => ({
      ...prevData,
      items: items,
      discount: discount,
      totalAmount: totalAmount,
    }));
  };

  const printData = async () => {
    setLoading(true);
    if (
      !items ||
      items[0].price === "" ||
      items[0].itemName === "" ||
      items[0].quantity === ""
    ) {
      toast.error("Items Should Not Be Empty Please enter Atleast one Item", {
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
    console.log(invoiceData);
    setInvoiceData((prevData) => ({
      ...prevData,
      items: items,
    }));
    setPrintDialog(true);
    ReactGA.event({
      category: "Print to Pdf",
      action: ` ${userData.username} Clicked on Print Button`,
      label: "Print Button Button",
    });
    await sendInvoiceData(invoiceData);
    setLoading(false);
  };

  return (
    <div className="create-invoice-wrapper  w-[100%] h-[100%] flex-row space-y-2">
      <LoaderToggle />
      <Tostify />
      <div className="flex justify-center create-text-1  gap-2 mt-2">
        <TextField
          id="company"
          name="company"
          value={invoiceData.company}
          onChange={(e) => handleInvoiceChange(e)}
          className="w-[40%] create-text-1-inp"
          label="Company Name"
          variant="outlined"
        />
        <TextField
          id="email"
          name="email"
          value={invoiceData.email}
          onChange={(e) => handleInvoiceChange(e)}
          className="w-[30%] create-text-1-inp"
          label="Email"
          variant="outlined"
        />
      </div>
      <div className="flex justify-center create-text-1 gap-2">
        <TextField
          id="mobile"
          name="mobile"
          value={invoiceData.mobile}
          onChange={(e) => {
            handleInvoiceChange(e);
          }}
          className="w-[30%] create-text-1-inp"
          label="Mobile Number"
          variant="outlined"
        />
        <TextField
          id="GST"
          name="GST"
          value={invoiceData.GST}
          onChange={(e) => handleInvoiceChange(e)}
          className="w-[40%] create-text-1-inp"
          label="GST Number"
          variant="outlined"
        />
      </div>
      <div className="flex justify-center create-text-1 ">
        <TextField
          id="address"
          name="address"
          value={invoiceData.address}
          onChange={(e) => handleInvoiceChange(e)}
          className="w-[793px] create-text-1-inp"
          label="Address"
          variant="outlined"
        />
      </div>
      <div className="items-wrapper flex justify-center">
        <div className="items">
          <div className="items-header flex justify-around items-center p-5   w-[793px] h-[40px] border border-[#444444] border-opacity-30 rounded-sm">
            <p className="text-[#444444] text-[16px] relative ">Item</p>
            <p className="text-[#444444] text-[16px] relative left-11">Price</p>
            <p className="text-[#444444] text-[16px] relative left-[70px]">
              Quantity
            </p>
            <p className="text-[#444444] text-[16px] relative left-[90px]">
              Amount
            </p>
            <p className="text-[#444444] text-[16px] relative left-[60px]">
              Delete
            </p>
          </div>
          <div className="items-down">
            {/* we apply map fuction on items arr. to handle multiple inpute fields with help of index */}
            {items.map((item, index) => (
              <div
                key={index}
                className="items-map flex justify-evenly items-center w-[793px] h-[50px] border border-[#444444] border-opacity-30 rounded-sm mt-2"
              >
                <input
                  id={`itemname-${index}`}
                  className="w-[20%] firstinp h-[30px] p-3 pl-3 rounded bg-transparent border border-[#444444] border-opacity-30"
                  placeholder="item name"
                  required
                  value={item.itemName}
                  type="text"
                  onChange={(e) =>
                    handleItemChange(index, "itemName", e.target.value)
                  }
                />
                <input
                  id={`price-${index}`}
                  className="no-spinner w-[20%] h-[30px] text-center p-3 pl-3  rounded bg-transparent border border-[#444444] border-opacity-30"
                  label="Price"
                  placeholder="Enter Price"
                  value={item.price}
                  type="number"
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                />
                <input
                  id={`quantity-${index}`}
                  className="no-spinner w-[20%] h-[30px] text-center  p-3 pl-3 rounded bg-transparent border border-[#444444] border-opacity-30"
                  label="Quantity"
                  value={item.quantity}
                  placeholder="Enter Quantity"
                  type="number"
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                />
                <input
                  id={`amount-${index}`}
                  className="no-spinner w-[20%] h-[30px] text-center  p-3 pl-3 rounded bg-transparent border border-[#444444] border-opacity-30"
                  label="Amount"
                  value={item.amount}
                  type="number"
                  readOnly
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteItem(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-start add-btn-wrapper ml-[160px] ">
        <button
          className="w-[100px] hover:bg-gray-700 add-btn h-[40px] rounded-md border-2 text-white bg-[#444444]"
          onClick={handleAddItem}
        >
          Add Items
        </button>
      </div>

      <div className="final-wrapper flex w-[100%]">
        <div className="flex discount-wrapper justify-start mt-2 ml-[160px] w-[40%] discount ">
          <TextField
            id="discount"
            name="discount"
            value={discount}
            onChange={(e) => handleDiscountChange(e)}
            type="number"
            className="w-[80%] discount"
            label="Discouunt in %"
            variant="outlined"
          />
        </div>
        <div className="calculation borde w-[30%] border-[#444444] border-opacity-30 p-5 flex-row justify-center items-center space-y-4ś rounded-md">
          <div>
            <p>Sub-Total : {subTotal}</p>

            <p>Discount : {discount}%</p>

            <p className="mb-1">Tax Amount : 18%</p>
            <div className="h-[1px] bg-[#444444] divider bg-opacity-30"></div>
            <p>Total Amount : {total}</p>
          </div>
        </div>
      </div>
      <div className="print-button flex justify-end m-10 mr-[160px]">
        <button
          className="bg-[#444444] hover:bg-gray-700 print-btn w-[100px] h-[40px] rounded-md text-white "
          onClick={() => {
            printData();
          }}
        >
          Print
        </button>
      </div>
      {printDialog && (
        <InvoicePrintPreview
          invoiceData={invoiceData}
          setPrintDialog={setPrintDialog}
          printDialog={printDialog}
          items={items}
          subTotal={subTotal}
          total={total}
          discount={discount}
        />
      )}
    </div>
  );
};

export default CreateInvoice;
