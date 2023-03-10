import React, { useState } from "react"
import { NavLink } from "react-router-dom"

function Header({ open, setOpen }) {
  // const [activeId, setActiveId] = useState('/')
  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "#dba124" : "",
      // borderBottom: isActive ? "3px solid #6366f1" : null,
    }
  }
  const links = [
    { name: "home", link: "/" },
    { name: "photography", link: "/photography" },
    { name: "about", link: "/about" },
  ]
  return (
    <div className="z-40 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-3 lg:px-0 flex justify-between py-5">
        <div className="flex items-center cursor-pointer">
          {/* <p className="font-bold text-2xl">Logo</p> */}
          {/* <img src="/assets/ui_logo.svg" className='h-10 w-10' alt="logo" /> */}
          <NavLink to="/" className="text-xl font-bold">
            <img src="/assets/logo.png" className="w-8 h-8" alt="Logo" />
          </NavLink>
        </div>
        <div
          className={`h-12 w-12 absolute top-3 right-5 flex flex-col justify-between items-center rounded cursor-pointer md:hidden border ${
            open ? "p-2" : "p-3"
          } z-50`}
          onClick={() => setOpen(!open)}
        >
          <div
            className={`w-full h-1 rounded-2xl bg-white transition-all duration-200 ease-in ${
              open ? "rotate-45 mt-4 block" : ""
            }`}
          ></div>
          <div
            className={`w-full h-1 rounded-2xl bg-white transition-all duration-200 ease-in ${
              open ? "hidden mb-5" : ""
            }`}
          ></div>
          <div
            className={`w-full h-1 rounded-2xl bg-white transition-all duration-200 ease-in ${
              open ? "-rotate-45 mb-3 inline-block" : ""
            }`}
          ></div>
        </div>
        <ul
          className={`flex flex-col md:flex-row items-start md:items-center pt-10 md:pt-0 justify-start md:justify-center absolute left-0 md:static w-3/4 h-screen md:h-auto md:w-auto transition-all duration-500 ease-in ${
            open
              ? "opacity-100 top-[65px] bg-primary lg:bg-transparent h-[calc(100vh-65px)]"
              : "opacity-0 md:opacity-100 top-[65px] left-[-500px]"
          } z-50`}
        >
          {links.map((item, index) => (
            <div key={index}>
              <NavLink
                to={item.link}
                className={`px-3 text-md font-noramal md:font-semibold py-3 md:my-0 cursor-pointer uppercase hover:text-red-600 md:hover:text-[#af811d]`}
                style={navLinkStyles}
                onClick={() => setOpen(!open)}
              >
                {item.name}
              </NavLink>
              {links.length !== index + 1 && (
                <div className="border-t mx-3 w-3/4 md:hidden"></div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Header