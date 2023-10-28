import { useState } from "react";
import { BiLogoLinkedinSquare } from 'react-icons/bi'
import { IoIosArrowBack } from 'react-icons/io'
import { BsMessenger } from 'react-icons/bs'
import { Link } from "react-router-dom";


const Popup = ({ onClose, currentItem }) => {
    const [showMessage, setShowMessage] = useState(false)

    const handleOnClose = (e) => {
        if (e.target.id) onClose()
    }

    const copyTextHandler = (item) => {
        navigator.clipboard.writeText(item.shortenLink);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 1000);
    }

    return (
        <div id="container" onClick={handleOnClose} className={`fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center px-2`}>
            <div className={`bg-[#FAFAFA] shadow-[0_0px_50px_0px_rgba(0,0,0,0.3)] rounded-xl gap-12 px-5 py-5 z-50 w-full max-w-sm text-black`}>
                <div className="py-3 flex justify-between">
                    <p className="text-xl font-semibold">Share this link</p>
                    <button className="font-bold" onClick={onClose}>X</button>
                </div>
                <ul>
                    <Link to={`${currentItem.shortenLink}`} target="_blank" className="px-3 py-3 hover:bg-slate-200 rounded-md cursor-pointer flex gap-3 items-center justify-between">
                        <div className="flex gap-3 items-center">
                            <BiLogoLinkedinSquare fill="#0A66C2" className="h-6 w-6" />
                            <p className="font-semibold text-lg">Share on LinkedIn</p>
                        </div>
                        <IoIosArrowBack className="rotate-180" />
                    </Link>
                    <Link to={`${currentItem.shortenLink}`} target="_blank" className="px-3 py-3 hover:bg-slate-200 rounded-md cursor-pointer flex gap-3 items-center justify-between">
                        <div className="flex gap-3 items-center">
                            <BsMessenger fill="#0A66C2" className="h-6 w-6" />
                            <p className="font-semibold text-lg">Share via Messanger</p>
                        </div>
                        <IoIosArrowBack className="rotate-180" />
                    </Link>
                </ul>
                <button onClick={() => copyTextHandler(currentItem)} className="flex justify-between border w-full px-3 py-2 my-2 rounded-md hover:bg-slate-200">
                    <p>{`${currentItem.shortenLink}`}</p>
                    <p className={`${showMessage ? 'text-green-400' : ''}`}>{showMessage ? 'Copied' : 'Copy'}</p>
                </button>
            </div>
        </div>
    );
};

export default Popup;
