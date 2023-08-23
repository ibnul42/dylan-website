import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AiFillCaretLeft } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'


const Modal = ({ onClose, currentItem }) => {
  const [selectedImage, setSelectedImage] = useState(currentItem)
  const handleOnClose = (e) => {
    if (e.target.id) onClose()
  }

  const { assets } = useSelector((state) => state.asset)

  const imageClickHandler = (item) => {
    setSelectedImage(item)
  }

  const btnClickHandler = (pos) => {
    const position = assets.findIndex(item => selectedImage.title === item.title)
    if (pos === 'left') {
      setSelectedImage(position < 1 ? assets[assets.length - 1] : assets[position - 1])
    } else {
      setSelectedImage(position > assets.length - 2 ? assets[0] : assets[position + 1])
    }
  }

  return (
    <div id="container" onClick={handleOnClose} className={`fixed inset-0 bg-opacity-20 backdrop-blur-lg z-50 flex items-center justify-center px-2`}>
      <div className={`py-5 h-full flex flex-col gap-3 justify-between`}>
      <div className="fixed right-1 top-1 z-50"><IoMdClose onClick={onClose} className='h-7 w-7 cursor-pointer' /></div>
        <div className={`h-4/5 relative`}>
          <div className="absolute top-0 -left-7 h-full flex flex-col justify-center">
            <AiFillCaretLeft onClick={() => btnClickHandler('left')} className='h-7 w-7 cursor-pointer' />
          </div>
          <div className="absolute top-0 -right-7 h-full flex flex-col justify-center">
            <AiFillCaretLeft onClick={() => btnClickHandler('right')} className='h-7 w-7 rotate-180 cursor-pointer' />
          </div>
          <img src={`${import.meta.env.VITE_REACT_DOMAIN_URL}${selectedImage.source}`} className='w-full max-h-full object-cover' alt={selectedImage.title} loading='lazy' />
        </div>
        <div className={`flex gap-2 justify-center overflow-x-auto`}>
          {assets && assets.length > 0 && assets.map((item) => (
            <img
              key={item.title}
              onClick={() => imageClickHandler(item)}
              src={`${import.meta.env.VITE_REACT_DOMAIN_URL}${item.source}`}
              className="w-16 h-16 flex-shrink-0 rounded-md object-cover cursor-pointer" alt={item.title} loading='lazy' />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;