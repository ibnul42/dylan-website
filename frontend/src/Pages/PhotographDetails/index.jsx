import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAssets, getImages } from '../../features/asset/assetSlice'
import Modal from './Modal'

const PhotographDetails = () => {
    const { type } = useParams()
    const dispatch = useDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [initialized, setInitialized] = useState(true)
    const [selectedImage, setSelectedImage] = useState()

    const { assets } = useSelector((state) => state.asset)

    useEffect(() => {
        if (initialized) {
            setInitialized(false)
            dispatch(getImages(type))
        }
    }, [initialized, dispatch])

    const openModal = (item) => {
        setSelectedImage(item)
        setIsModalOpen(!isModalOpen)
    }

    const closeModal = () => {
        setIsModalOpen(!isModalOpen)
    }
    return (
        <div className='flex-1 my-2'>
            <Helmet>
                <title>{type.charAt(0).toUpperCase().concat(type.slice(1))} - Dylan Luper</title>
                <link rel="canonical" href="https://www.dylanluper.com/photography" />
            </Helmet>
            <div className={`max-w-[1440px] mx-auto px-2 gap-5 ${type === 'rug_making' ? 'grid grid-cols-1 md:grid-cols-3' : 'columns-1'} ${assets.length > 0 ? 'md:columns-3' : ''}`}>
                {assets && assets.length > 0 && assets.map((item) => (
                    <div key={item.title} className='py-5'>
                        <img
                            onClick={() => openModal(item)}
                            src={`${import.meta.env.VITE_REACT_DOMAIN_URL}${item.source}`}
                            className="w-full h-auto rounded-md object-cover cursor-pointer" alt={item.title} loading='lazy' />
                        {type === 'rug_making' &&
                            <div className="flex justify-between py-2">
                                <p>{item.source.split('/').pop().split('.')[0]}</p>
                                <p>{item.year}</p>
                            </div>}
                    </div>
                ))}
                {assets && assets.length < 1 && <p className='py-20 text-center'>No image Found</p>}
                {isModalOpen && <Modal onClose={closeModal} currentItem={selectedImage} />}
            </div>
        </div>
    )
}

export default PhotographDetails