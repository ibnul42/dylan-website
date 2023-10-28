import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, NavLink } from 'react-router-dom';
import Popup from '../../components/Popup';
import { useDispatch, useSelector } from 'react-redux'
import { getAllLink } from '../../features/link/linkSlice';

const ShareInfo = () => {
  const dispatch = useDispatch()
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  const { links } = useSelector((state) => state.link)

  useEffect(() => {
    dispatch(getAllLink())
  }, [])

  const onClose = () => {
    setCurrentItem(null)
    setIsPopupOpen(false)
  }

  const buttonClickHandler = (item) => {
    setCurrentItem(item)
    setIsPopupOpen(true)
  }



  return (
    <div className='flex-1 my-2'>
      <Helmet>
        <title>Share Information - Dylan Luper</title>
        <link rel="canonical" href="https://www.dylanluper.com/shareinfo" />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-2 flex flex-col justify-center items-center gap-3">
        {links && links.length > 0 && links.map((item, index) => (
          <div className="hoveranim bg-white w-full max-w-3xl rounded-md shadow-lg text-black px-2 py-1 flex justify-between items-center">
            <NavLink to="/" className="text-xl font-bold">
              <img src="/assets/logo.png" className="w-8 h-8" alt="Logo" />
            </NavLink>
            <Link to={`${item.originalLink}`} target='_blank'>{item.displayName}</Link>
            <button onClick={() => buttonClickHandler(item)}>...</button>
          </div>
        ))}
      </div>
      {isPopupOpen && <Popup currentItem={currentItem}  onClose={onClose} />}
    </div >
  )
}

export default ShareInfo