import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from "react-redux"
import { createLink, editLink, getAllLink, getLink, reset } from '../../../features/link/linkSlice'
import { toast } from 'react-toastify'
import { Link, useNavigate, useParams } from 'react-router-dom'

const EditLink = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const [originalLink, setOriginalLink] = useState('')
    const [uniqueId, setUniqueId] = useState('')
    const [displayName, setDisplayName] = useState('')

    const { isLinkCreated, linkdata, message, isError, isLinkGet, isLinkEdited } = useSelector((state) => state.link)

    useEffect(() => {
        if (isLinkGet) {
            if (linkdata === null) {
                toast.error(message)
                dispatch(reset())
                navigate('/admin/create-link')
            } else {
                setDisplayName(linkdata.displayName)
                setOriginalLink(linkdata.originalLink)
                setUniqueId(linkdata.shortenLink.split('/').pop())
                dispatch(reset())
            }
        } else if (isLinkEdited) {
            toast.success(message)
            dispatch(reset())
            navigate('/admin/create-link')
        } else if (isError) {
            toast.error(message)
            dispatch(reset())
        } else {
            dispatch(getLink(id))
        }
    }, [dispatch, isLinkCreated, linkdata, message, isError])

    const submitHandler = (e) => {
        e.preventDefault()
        const data = {
            originalLink,
            uniqueId,
            displayName
        }
        dispatch(editLink({ id, data }))
    }

    return (
        <div>
            <Helmet>
                <title>Link Update - Dylan Luper</title>
                <link rel="canonical" href="https://www.dylanluper.com/create-link" />
            </Helmet>
            <div className="max-w-7xl mx-auto px-2 py-10 space-y-2">
                <form onSubmit={submitHandler} className='flex flex-col gap-3 justify-center'>
                    <input type="text" value={originalLink} onChange={(e) => setOriginalLink(e.target.value)} name="" id="" placeholder='Enter your link' className='w-72 self-center px-3 py-2 rounded-full text-black focus:outline-0 border' />
                    <input type="text" value={uniqueId} onChange={(e) => setUniqueId(e.target.value)} name="" id="" placeholder='Enter name' className='w-72 self-center px-3 py-2 rounded-full text-black focus:outline-0 border' />
                    <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} name="" id="" placeholder='Enter display name' className='w-72 self-center px-3 py-2 rounded-full text-black focus:outline-0 border' />
                    <button type="submit" className='py-2 px-4 border min-w-max rounded-md hover:bg-gray-100 self-center'>Update Link</button>
                </form>
            </div>
        </div>
    )
}

export default EditLink