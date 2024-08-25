import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tostify = () => {
  return (
    <ToastContainer
      position="top-left"
      autoClose={3500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default Tostify;
