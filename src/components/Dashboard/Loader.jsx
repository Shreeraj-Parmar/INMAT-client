import React, { useContext } from "react";
import { CircularProgress, Dialog } from "@mui/material";
import { dialogContext } from "../../context/AooProvider";

// const dialogStyle = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   backgroundColor: "transparent", // Make the background fully transparent
// };

const LoaderToggle = () => {
  const { loading } = useContext(dialogContext);
  return (
    <>
      <Dialog
        open={loading}
        PaperProps={{
          sx: {
            backgroundColor: "transparent", // Ensure Paper component is transparent
            boxShadow: "none", // Remove any shadow or outline
            overflow: "hidden", // Prevent overflow
          },
        }}
        BackdropProps={{
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.3)", // Optional: Adjust backdrop color and transparency
            backdropFilter: "blur(0.1px)", // Optional: Adds a subtle blur effect
          },
        }}
      >
        {loading && <CircularProgress />}
      </Dialog>
    </>
  );
};

export default LoaderToggle;
