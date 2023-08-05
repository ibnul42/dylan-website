import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import Modal from './Modal'
import config from '../../../config'

const images = [
    {
        title: 'item 1',
        id: '1',
        type: 'Concert',
        source: 'https://images.unsplash.com/photo-1634538748961-b7bfaa05af81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'
    },
    {
        title: 'item 2',
        id: '2',
        type: 'Landscape',
        source: 'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
    },
    {
        title: 'item 3',
        id: '3',
        type: 'Concert',
        source: 'https://images.unsplash.com/17/unsplash_5252bb51404f8_1.JPG?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        title: 'item 4',
        id: '4',
        type: 'people',
        source: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        title: 'item 5',
        id: '5',
        type: 'Industrial',
        source: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        title: 'item 6',
        id: '6',
        type: 'people',
        source: 'https://images.unsplash.com/photo-1517732306149-e8f829eb588a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'
    },
    {
        title: 'item 7',
        id: '7',
        type: 'Industrial',
        source: 'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80'
    },
    {
        title: 'item 8',
        id: '8',
        type: 'people',
        source: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        title: 'item 9',
        id: '9',
        type: 'Industrial',
        source: 'https://images.unsplash.com/photo-1511454493857-0a29f2c023c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        title: 'item 10',
        id: '10',
        type: 'Landscape',
        source: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        title: 'item 11',
        id: '11',
        type: 'people',
        source: 'https://images.unsplash.com/photo-1674574124345-02c525664b65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        title: 'item 12',
        id: '12',
        type: 'people',
        source: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
    },
    {
        title: 'item 13',
        id: '13',
        type: 'Industrial',
        source: 'https://images.unsplash.com/photo-1501523460185-2aa5d2a0f981?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=931&q=80'
    },
    {
        title: 'item 14',
        id: '14',
        type: 'Industrial',
        source: 'https://images.unsplash.com/photo-1493476523860-a6de6ce1b0c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
    },
    {
        title: 'item 15',
        id: '15',
        type: 'Concert',
        source: 'https://images.unsplash.com/photo-1501527459-2d5409f8cf9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        title: 'item 16',
        id: '16',
        type: 'Concert',
        source: 'https://images.unsplash.com/photo-1523198421516-973dc001a953?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80'
    },
    {
        title: 'item 17',
        id: '17',
        type: 'Concert',
        source: 'https://images.unsplash.com/photo-1563841930606-67e2bce48b78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80'
    },
    {
        title: 'item 18',
        id: '18',
        type: 'Landscape',
        source: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        title: 'item 19',
        id: '19',
        type: 'Landscape',
        source: 'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1042&q=80'
    },
    {
        title: 'item 20',
        id: '20',
        type: 'Landscape',
        source: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        title: 'item 21',
        id: '21',
        type: 'Landscape',
        source: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        title: 'item 22',
        id: '22',
        type: 'people',
        source: 'https://plus.unsplash.com/premium_photo-1663054774427-55adfb2be76f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        title: 'item 23',
        id: '23',
        type: 'people',
        source: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=815&q=80'
    },
    {
        title: 'item 24',
        id: '24',
        type: 'people',
        source: 'https://images.unsplash.com/photo-1674574124792-3be232f1957f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        title: 'item 25',
        id: '25',
        type: 'people',
        source: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        title: 'item 26',
        id: '26',
        type: 'people',
        source: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        title: 'item 27',
        id: '27',
        type: 'people',
        source: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        title: 'item 28',
        id: '28',
        type: 'people',
        source: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        title: 'item 29',
        id: '29',
        type: 'people',
        source: 'https://images.unsplash.com/photo-1517586979036-b7d1e86b3345?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80'
    },
    {
        title: 'item 30',
        id: '30',
        type: 'people',
        source: 'https://images.unsplash.com/photo-1553530979-fbb9e4aee36f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    }
]

import cloudinary from 'cloudinary-core';
import { useDispatch, useSelector } from 'react-redux';
import { getAssets, getImages } from '../../features/asset/assetSlice';

// const cl = new cloudinary.Cloudinary({cloud_name: 'ibnulashir'});

const PhotographDetails = () => {
    const dispatch = useDispatch()
    const { type } = useParams()
    const [filteredImages, setFilteredImages] = useState([])
    const [selectedImage, setSelectedImage] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const { assets } = useSelector((state) => state.asset)

    const openModal = (item, index) => {
        setSelectedImage(item)
        setSelectedIndex(index)
        setIsModalOpen(true);
    };

    const buttonHandler = (targetBtn) => {
        if (targetBtn === 'left') {
            const newIndex = selectedIndex === 0 ? filteredImages.length - 1 : selectedIndex - 1
            setSelectedIndex(newIndex)
            setSelectedImage(filteredImages[newIndex])
        } else if (targetBtn === 'right') {
            const newIndex = selectedIndex === filteredImages.length - 1 ? 0 : selectedIndex + 1
            setSelectedIndex(newIndex)
            setSelectedImage(filteredImages[newIndex])
        }
    }

    const customImageChangeHandler = (item) => {
        setSelectedImage(item)
        setSelectedIndex(filteredImages.findIndex(i => i.id === item.id))
    }

    const closeModal = () => {
        console.log(1234)
        setIsModalOpen(false);
    };

    useEffect(() => {
        setFilteredImages(images.filter((item) => item.type.toLocaleLowerCase() === type.toLocaleLowerCase()))
    }, [])

    useEffect(() => {
        if (assets.length > 0) {
            setFilteredImages(assets.filter((item) => item.type.toLocaleLowerCase() === type.toLocaleLowerCase()))
        } else {
            dispatch(getImages(type))
        }
    }, [assets[0]?.title])
    return (
        <div className='flex-1 my-2'>
            <Helmet>
                <title>{type.charAt(0).toUpperCase().concat(type.slice(1))} - Dylan Luper</title>
                <link rel="canonical" href="https://www.dylanluper.com/photography" />
            </Helmet>
            <div className="max-w-[1440px] mx-auto px-2 gap-5 columns-1 md:columns-3">
                {filteredImages.map((item, index) => (
                    <div key={index} className="mb-3">
                        <img src={config.domainUrl + item.source} className="w-full rounded-md object-cover" alt="" onClick={() => openModal(item, index)} />
                        <Modal isOpen={isModalOpen} closeModal={closeModal}>
                            <div className="flex flex-col gap-3 items-center">
                                <div className=" relative flex justify-center text-white">
                                    <img src={config.domainUrl + selectedImage?.source} className="min-w-[24vw] min-h-[24vh] w-4/5 max-h-[95vh] self-center" alt={item.title} />
                                    <div className="absolute top-0 left-0 h-full flex flex-col justify-center items-center text-3xl">
                                        <button className='' onClick={() => buttonHandler('left')}>{`<`}</button>
                                    </div>
                                    <div className="absolute top-0 right-0 h-full flex flex-col justify-center items-center text-3xl">
                                        <button className='' onClick={() => buttonHandler('right')}>{`>`}</button>
                                    </div>
                                </div>
                                <div className="flex gap-1 justify-center text-white">
                                    <div className="flex">
                                        {filteredImages.map((item, index) => (
                                            <img key={index} src={config.domainUrl + item.source} className={`h-16 md:h-16 w-16 md:w-16 cursor-pointer object-cover ${selectedImage.id == item.id ? 'opacity-100' : 'opacity-10'}`} alt={item.title} onClick={() => customImageChangeHandler(item)} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PhotographDetails