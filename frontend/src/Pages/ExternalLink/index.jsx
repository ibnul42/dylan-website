import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getLinkByName, reset } from '../../features/link/linkSlice'
import { toast } from 'react-toastify'

const ExternalLink = () => {
    const { link } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLinkGet, linkdata, isError, message } = useSelector((state) => state.link)

    useEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(reset())
            navigate('/')
        } else if (isLinkGet) {
            window.location.href = linkdata.originalLink
        } else {
            dispatch(getLinkByName(link))
        }
    }, [dispatch, isError, message, isLinkGet])
    return (
        <div>
            <p className='py-10 text-center'>Please wait ...</p>
        </div>
    )
}

export default ExternalLink