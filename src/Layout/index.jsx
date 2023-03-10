import React, { useState } from "react"
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Photography from "../Pages/Photography";
import About from "../Pages/About"
import Footer from "./Footer"
import Header from "./Header"

const Layout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${open ? "h-screen overflow-y-hidden md:min-h-screen md:overflow-y-scroll" : "min-h-screen"} flex flex-col justify-between text-gray-700`}>
      <Header open={open} setOpen={setOpen} />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/photography" element={<Photography />} />
      <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default Layout