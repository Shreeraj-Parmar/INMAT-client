// components:

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Login from "./components/Login";
import ReactGA from "react-ga4";
import { useEffect } from "react";

//wraper :
import AllProvider from "./context/AooProvider";
import SignUp from "./components/SignUp";
import CheckInternet from "./CheckInternet";

//router:
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Tostify from "./components/Dashboard/Tostify.jsx";

const googleAnalyticsId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

const TRACKING_ID = googleAnalyticsId; // Replace with your Measurement ID
ReactGA.initialize(TRACKING_ID);

function App() {
  useEffect(() => {
    ReactGA.send("pageview"); // Track initial page load
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <CheckInternet />
          <Navbar />
          <Hero />
          <Login />
          <SignUp />
        </>
      ),
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);
  return (
    <>
      <AllProvider>
        <Tostify />
        <RouterProvider router={router} />
      </AllProvider>
    </>
  );
}

export default App;
