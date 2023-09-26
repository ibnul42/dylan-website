import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from "react-redux"
import { createLink, reset } from '../../features/link/linkSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const CreateLink = () => {
    const dispatch = useDispatch()
    const [originalLink, setOriginalLink] = useState('')
    const [uniqueId, setUniqueId] = useState('')
    const [convertedLinks, setConvertedLinks] = useState([])

    const { isLinkCreated, linkdata, message, isError } = useSelector((state) => state.link)

    useEffect(() => {
        if (isLinkCreated) {
            toast.success('Link sortened successfully')
            setConvertedLinks([linkdata, ...convertedLinks])
            dispatch(reset())
        } else if (isError) {
            toast.error(message)
            dispatch(reset())
        }
    }, [dispatch, isLinkCreated, linkdata, message, isError])

    const submitHandler = (e) => {
        e.preventDefault()
        const data = {
            originalLink,
            uniqueId
        }
        dispatch(createLink(data))
    }

    return (
        <div>
            <Helmet>
                <title>Link Creation - Dylan Luper</title>
                <link rel="canonical" href="https://www.dylanluper.com/create-link" />
            </Helmet>
            <div className="max-w-7xl mx-auto px-2 py-10 space-y-2">
                <form onSubmit={submitHandler} className='flex flex-col gap-3 justify-center'>
                    <input type="text" value={originalLink} onChange={(e) => setOriginalLink(e.target.value)} name="" id="" placeholder='Enter your link' className='w-72 self-center px-3 py-2 rounded-full text-black focus:outline-0 border' />
                    <input type="text" value={uniqueId} onChange={(e) => setUniqueId(e.target.value)} name="" id="" placeholder='Enter name' className='w-72 self-center px-3 py-2 rounded-full text-black focus:outline-0 border' />
                    <button type="submit" className='py-2 px-4 border min-w-max rounded-md hover:bg-gray-100 self-center'>Create Link</button>
                </form>
                <div className="py-5">
                    <p className='font-semibold text-xl underline underline-offset-4'>Shortened Links:</p>
                    <div className="flex flex-col gap-2 py-5">
                        {convertedLinks && convertedLinks.length > 0 && convertedLinks.map(item => (
                            <Link key={item.originalLink} to={item.shortenLink} target='_blank' className='hover:underline'>{item.shortenLink}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateLink