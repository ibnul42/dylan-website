import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const displayClass = isOpen ? 'block' : 'hidden';

  return (
    <div className={`${displayClass} fixed inset-0 z-40 flex justify-center items-center`}>
      <div className="relative w-screen h-screen p-10 flex flex-col justify-center items-center px-3 bg-gray-600 bg-opacity-25">
        <button className='absolute top-2 right-3 md:right-10 text-2xl text-white font-semibold py-2 text-end' onClick={() => onClose()}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
