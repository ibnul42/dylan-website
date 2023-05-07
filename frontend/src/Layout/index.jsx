import React, { useState } from "react"
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Photography from "../Pages/Photography";
import About from "../Pages/About"
import Footer from "./Footer"
import Header from "./Header"
import PhotographDetails from "../Pages/PhotographDetails";

const Layout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${open ? "h-screen overflow-y-hidden md:min-h-screen md:overflow-y-visible" : "min-h-screen"} overflow-x-hidden flex flex-col justify-between text-white bg-black`}>
      <Header open={open} setOpen={setOpen} />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/photography" element={<Photography />} />
      <Route path="/about" element={<About />} />
      <Route path="/photography/:type" element={<PhotographDetails />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default Layout