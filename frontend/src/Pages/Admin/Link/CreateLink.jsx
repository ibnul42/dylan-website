import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from "react-redux"
import { createLink, deleteLink, getAllLink, reset } from '../../../features/link/linkSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const CreateLink = () => {
    const dispatch = useDispatch()
    const [originalLink, setOriginalLink] = useState('')
    const [uniqueId, setUniqueId] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [convertedLinks, setConvertedLinks] = useState([])

    const { isLinkCreated, linkdata, message, isError, links,isLinkDeleted } = useSelector((state) => state.link)

    useEffect(() => {
        if (isLinkCreated) {
            toast.success('Link created successfully')
            setDisplayName('')
            setOriginalLink('')
            setUniqueId('')
            setConvertedLinks([linkdata, ...convertedLinks])
            dispatch(reset())
        } else if (isError) {
            toast.error(message)
            dispatch(reset())
        } else if(isLinkDeleted) {
            toast.success(message)
            dispatch(reset())
        } else {
            dispatch(getAllLink())
        }
    }, [dispatch, isLinkCreated, linkdata, message, isError,isLinkDeleted])

    const submitHandler = (e) => {
        e.preventDefault()
        const data = {
            originalLink,
            uniqueId,
            displayName
        }
        dispatch(createLink(data))
    }

    const deleteItem =(item) => {
        dispatch(deleteLink(item._id))
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
                    <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} name="" id="" placeholder='Enter display name' className='w-72 self-center px-3 py-2 rounded-full text-black focus:outline-0 border' />
                    <button type="submit" className='py-2 px-4 border min-w-max rounded-md hover:bg-gray-100 self-center'>Create Link</button>
                </form>
                <div className="py-5">
                    <p className='font-semibold text-xl underline underline-offset-4'>Shortened Links:</p>
                    <div className="flex flex-col gap-2 py-5">
                        <table
                            className="table-auto border my-5 border-primary mx-2 px-2"
                            style={{
                                width: "-webkit-fill-available",
                            }}
                        >
                            <thead className="border-b">
                                <tr className="bg-primary text-white grid grid-cols-12">
                                    <th className="px-4 py-2 col-span-3 border-r">
                                        Display Name
                                    </th>
                                    <th className="px-4 py-2 col-span-4 border-r">
                                        Original Link
                                    </th>
                                    <th className="px-4 py-2 col-span-3 border-r">
                                        Shorten Link
                                    </th>
                                    <th className="px-4 py-2 col-span-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {links && links.length > 0 ? (
                                    links.map((item, index) => (
                                        <tr key={index} className="even:bg-[#84BFB5] grid grid-cols-12">
                                            <td className="px-4 py-2 col-span-3 border-r border-primary flex items-center justify-center">
                                                <p>{item.displayName}</p>
                                            </td>
                                            <td className="px-4 py-2 col-span-4 border-r border-primary flex items-center justify-center max-h-44 overflow-y-auto">
                                                <Link to={item.originalLink} target='_blank' className='hover:underline'>{item.originalLink}</Link>
                                            </td>
                                            <td className="px-4 py-2 col-span-3 border-r border-primary flex items-center justify-center max-h-44 overflow-y-auto">
                                                <Link to={item.shortenLink} target='_blank' className='hover:underline'>{item.shortenLink}</Link>
                                            </td>
                                            <td className="px-4 py-2 col-span-2 flex justify-center items-center gap-3">
                                                <Link to={`/admin/edit-link/${item._id}`}
                                                    className="px-4 py-1 rounded-full border border-primary hover:bg-slate-100 text-primary font-medium cursor-pointer h-max"
                                                > Edit
                                                    {/* <AiFillEdit /> */}
                                                </Link>
                                                <button
                                                    onClick={() => deleteItem(item)}
                                                    className="px-4 py-1 rounded-full border border-primary hover:bg-slate-100 text-primary font-medium cursor-pointer h-max"
                                                > Delete
                                                    {/* <MdDelete /> */}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="odd:bg-gray-100 grid grid-cols-3">
                                        <td className="px-4 py-2 col-span-3 border-r border-primary text-center">
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateLink