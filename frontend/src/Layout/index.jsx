import React, { useEffect, useState } from "react"
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "../Pages/Home";
import Photography from "../Pages/Photography";
import About from "../Pages/About"
import Footer from "./Footer"
import Header from "./Header"
import PhotographDetails from "../Pages/PhotographDetails";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import AdminEvent from "../Pages/Admin/AdminEvent"
import CreateAdmin from "../Pages/Admin/AdminEvent/CreateEvent"
import EditEvent from "../Pages/Admin/AdminEvent/EditEvent"
import AdminHome from "../Pages/Admin/AdminHome"
import CreateActivity from "../Pages/Admin/AdminHome/CreateActivity"
import CreateTimeline from "../Pages/Admin/AdminHome/CreateTimeline"
import AdminContact from "../Pages/Admin/Contact"
import CreateContact from "../Pages/Admin/Contact/CreateContact"
import Prayer from "../Pages/Admin/Prayer"
import Profile from "../Pages/Admin/Profile"
import Login from "../Pages/Login";

const adminLinks = [
  { titile: "Profile", path: "/admin/profile" },
  { titile: "Event", path: "/admin/event" },
  { titile: "Home", path: "/admin/home" },
  { titile: "Contact", path: "/admin/contact" },
  { titile: "Prayer Request", path: "/admin/prayers" },
]

const Layout = () => {
  const [adminPanel, setAdminPanel] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    // if (!user) {
    //   navigate("/login")
    // }
    if (user && location.pathname.toString().includes("/admin")) {
      setAdminPanel(true)
    }
    if (!location.pathname.toString().includes("/admin")) {
      setAdminPanel(false)
    }
  }, [location, user, dispatch, navigate, location])

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
  }

  return (
    // <div className={`${open ? "h-screen overflow-y-hidden md:min-h-screen md:overflow-y-visible" : "min-h-screen"} overflow-x-hidden flex flex-col justify-between text-white bg-black`}>


    // </div>
    <div
      // className={`${adminPanel ? "w-screen grid grid-cols-12" : "max-w-7xl"} flex-auto mx-auto w-full`}
      className={`${open ? "h-screen overflow-y-hidden md:min-h-screen md:overflow-y-visible" : "min-h-screen"} overflow-x-hidden flex flex-col justify-between text-white bg-black`}
    >
      <div className={`${adminPanel ? 'col-span-12' : ''}`}>
        <Header open={open} setOpen={setOpen} />
      </div>

      <div className={`${adminPanel ? "w-screen grid grid-cols-12" : ""} flex-grow`}>
        {adminPanel && (
          <div className="col-span-2 border-r flex flex-col justify-between">
            <div className="flex flex-col">
              {adminLinks &&
                adminLinks.map((item, index) => (
                  <Link
                    key={index}
                    className="bg-primary hover:bg-hover py-3 text-white px-3 font-medium"
                    to={item.path}
                  >
                    {item.titile}
                  </Link>
                ))}
            </div>
            <Link
                className="bg-primary py-3 px-3 font-medium hover:bg-hover text-white"
                to={"/login"}
                onClick={onLogout}
                state={{ logout: true }}
              >
                Logout
              </Link>
            {/* <div className="flex-grow flex flex-col justify-end">
              <Link
                className="bg-primary py-3 px-3 font-medium hover:bg-hover text-white"
                to={"/login"}
                onClick={onLogout}
                state={{ logout: true }}
              >
                Logout
              </Link>
            </div> */}
          </div>
        )}
        <div className={`${adminPanel ? "col-span-10 bg-white" : ""}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/events" element={<Event />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/about" element={<About />} />
            <Route path="/photography/:type" element={<PhotographDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/event" element={<AdminEvent />} />
            <Route path="/admin/contact" element={<AdminContact />} />
            <Route path="/admin/create-contact" element={<CreateContact />} />
            <Route path="/admin/create-event" element={<CreateAdmin />} />
            <Route path="/admin/edit-event/:id" element={<EditEvent />} />
            <Route path="/admin/home" element={<AdminHome />} />
            <Route
              path="/admin/home/create-activity"
              element={<CreateActivity />}
            />
            <Route
              path="/admin/home/create-timeline"
              element={<CreateTimeline />}
            />
            <Route path="/admin/prayers" element={<Prayer />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>

      <div className={`${adminPanel ? 'col-span-12' : ''}`}>
        <Footer />
      </div>
    </div>
  )
}

export default Layout