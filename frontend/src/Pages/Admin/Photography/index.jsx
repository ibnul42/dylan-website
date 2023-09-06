import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { addAssets, createFolder, getFolders, getImages, removeAsset, removeFolder, reset } from '../../../features/asset/assetSlice'
import { toast } from 'react-toastify'
import axios from 'axios'

const Photography = () => {
  const dispatch = useDispatch()
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState([]);
  const [thumbnailChange, setThumbnailChange] = useState(false)

  const [tempThumb, setTempThumb] = useState();
  const [changedThumbnail, setChangedThumbnail] = useState()

  const { folders, assets, isError, message, isFolderCreated, isAssetAdded, isAssetDeleted, isFolderDeleted, isLoading, thumb } = useSelector((state) => state.asset)
  const [currentType, setCurrentType] = useState(null)

  const [typeText, setTypeText] = useState('')
  const [createType, setCreateType] = useState(false)
  const [year, setYear] = useState('')


  useEffect(() => {
    if (currentType === null && folders.length > 0) {
      setCurrentType(folders[0].name)
      dispatch(getImages(folders[0].name))
    } else if (isFolderCreated) {
      setCreateType(false)
      setTypeText('')
      dispatch(reset())
      dispatch(getFolders())
    } else if (isError) {
      toast.error(message)
      dispatch(reset())
    } else if (isAssetAdded) {
      toast.success(message)
      dispatch(reset())
      dispatch(getImages(currentType))
    } else if (isAssetDeleted) {
      toast.success(message)
      dispatch(reset())
      dispatch(getImages(currentType))
    } else if (isFolderDeleted) {
      toast.success(message)
      dispatch(reset())
      dispatch(getFolders())
    } else if (thumbnailChange) {
      setThumbnailChange(false)
      dispatch(reset())
      dispatch(getImages(currentType))
    } else {
      dispatch(getFolders())
    }
  }, [folders[0]?.name, isFolderCreated, isError, isAssetAdded, isAssetDeleted, isFolderDeleted, thumbnailChange])

  const onTypeChange = (item) => {
    setYear('')
    setCurrentType(item.name)
    dispatch(getImages(item.name))
  }

  const onTypeCancel = () => {
    setTypeText('')
    setCreateType(false)
  }

  const onTypeCreate = () => {
    dispatch(createFolder(typeText.trim()))
    // setCreateType(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append each selected file to the FormData object
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append(`photos`, selectedFiles[i])
      formData.append('year', year)
    }
    dispatch(addAssets({ currentType, formData, year }))
  }

  const onDeleteImage = (item) => {
    dispatch(removeAsset({
      type: item.type,
      file: item.title
    }))
  }

  const onDeleteFolder = () => {
    dispatch(removeFolder({ dir: currentType }))
  }

  const thumbnailUpload = async (event) => {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem("user"))["token"]
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }

    // Create a new FormData object
    const formData = new FormData();

    // Append each selected file to the FormData object
    formData.append(`thumbnail`, selectedThumbnail[0]);

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_DOMAIN_URL}/assets/upload/thumbnail/${currentType}`, formData, config)
      setThumbnailChange(true)
      setChangedThumbnail(tempThumb)
    } catch (error) {
      console.log(error)
    }
    dispatch(addAssets({ currentType, formData }))
  }

  const thumbnailUpdate = async (event) => {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem("user"))["token"]
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }

    // Create a new FormData object
    const formData = new FormData();

    // Append each selected file to the FormData object
    formData.append(`thumbnail`, selectedThumbnail[0]);

    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_DOMAIN_URL}/assets/upload/thumbnail/${currentType}/${thumb[0]._id}`, formData, config)
      setThumbnailChange(true)
      dispatch(getImages(currentType))
      setChangedThumbnail(tempThumb)
    } catch (error) {
      console.log(error)
    }
    dispatch(addAssets({ currentType, formData }))
  }

  const onDeleteThumbnail = async () => {
    const token = JSON.parse(localStorage.getItem("user"))["token"]
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }

    try {
      const response = await axios.delete(`${import.meta.env.VITE_REACT_DOMAIN_URL}/assets/rmThumb/${currentType}`,
        config
      )
      toast.success(response.data.msg)
      setChangedThumbnail()
    } catch (error) {
      toast.error('Failed to delete thumbnail')
    }
  }

  return (
    <div className='p-2 pr-6 flex flex-col h-full'>
      <div className="flex justify-between">
        <p className='font-semibold text-lg'>All types</p>
        <button className='bg-teal-600 hover:bg-teal-700 text-stone-50 py-2 px-3 rounded' onClick={() => setCreateType(true)}>Create</button>
      </div>
      <div className="flex flex-wrap gap-1 py-3">
        {folders && folders.length > 0 && folders.map((item, index) => (
          <button key={index} className={`${currentType === item.name ? 'bg-sky-700' : 'bg-sky-500'} hover:bg-sky-700 text-stone-50 py-2 px-3 rounded`} onClick={() => {
            onTypeChange(item)
            setChangedThumbnail()
          }}>{item.name.split("_").join(" ")}</button>
        ))}
      </div>
      {currentType &&
        <div className="">
          <p className='font-semibold text-lg'>Thumbnail</p>
          {thumb && thumb.length > 0 &&
            <div className="p-1 border h-32 w-32 flex justify-center items-center relative">
              <img className='max-h-full max-w-full' src={`${changedThumbnail ? changedThumbnail : `${import.meta.env.VITE_REACT_DOMAIN_URL}${thumb[0]?.source}`}`} alt="thumbnail" loading='lazy' />
              <div className="absolute h-full w-full opacity-0 hover:opacity-100 backdrop-blur-sm flex justify-center items-center">
                <button
                  onClick={onDeleteThumbnail}
                >
                  <img src="/assets/delete.svg" className='h-10 w-10' alt="" />
                </button>
              </div>
            </div>}
          <form className='w-full' onSubmit={thumb && thumb.length > 0 ? thumbnailUpdate : thumbnailUpload}>
            <input type="file" onChange={(event) => {
              setSelectedThumbnail(event.target.files)
              const file = event.target.files[0]
              setTempThumb(URL.createObjectURL(file))
            }
            } />
            <button type="submit" disabled={isLoading ? true : false} className={`border  ${isLoading ? 'bg-red-300 hover:bg-red-300 border-red-500' : 'hover:bg-indigo-500 border-blue-500'} rounded hover:text-white px-3 py-1`}>{isLoading ? 'Please wait' : 'Upload'}</button>
          </form>
        </div>
      }

      <div className="flex-grow flex justify-center">
        {createType ?
          <div className="border rounded p-3 max-w-sm self-center flex flex-col gap-5">
            <p className='font-semibold text-gray-800 text-lg'>Create new category</p>
            <input type="text" placeholder='Nature' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="" value={typeText} onChange={(e) => setTypeText(e.target.value)} id="" />
            <div className="flex justify-between">
              <button className='bg-red-600 hover:bg-red-700 text-stone-50 py-2 px-3 rounded' onClick={onTypeCancel}>Cancel</button>
              <button className='bg-green-700 hover:bg-green-800 text-stone-50 py-2 px-3 rounded' onClick={onTypeCreate}>Create</button>
            </div>
          </div> : <div className="w-full flex flex-col gap-2">
            <p className='w-full py-2 flex-shrink-0 font-semibold text-lg'>Photos</p>
            <div className="flex gap-2 flex-wrap">
              {assets
                && assets.length > 0 ? assets.map((asset, index) => (
                  <div key={index} className="p-1 border h-32 w-32 flex justify-center items-center relative">
                    <img className='max-h-full max-w-full' src={`${import.meta.env.VITE_REACT_DOMAIN_URL}${asset.source}`} alt={asset.title} loading='lazy' />
                    <div className="absolute h-full w-full opacity-0 hover:opacity-100 backdrop-blur-sm flex justify-center items-center">
                      <button onClick={() => onDeleteImage(asset)}>
                        <img src="/assets/delete.svg" className='h-10 w-10' alt="delete" />
                      </button>
                    </div>
                  </div>
                )) :
                <div className='w-full flex flex-col justify-center items-center gap-2'>
                  <p>No assets found</p>
                  {folders.length > 0 && <button onClick={onDeleteFolder} className='border border-red-600 hover:bg-red-600 hover:text-white py-2 px-3 rounded'>Delete Folder</button>}
                </div>}
            </div>
            {folders.length > 0 &&
              <form className='w-full' onSubmit={handleSubmit}>
                <input type="file" multiple onChange={(event) => setSelectedFiles(event.target.files)} />
                {currentType === 'rug_making' && <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className='border focus:outline-0 px-2 py-1 w-20 mx-5 rounded' placeholder='Year' />}
                <button type="submit" disabled={isLoading ? true : false} className={`border  ${isLoading ? 'bg-red-300 hover:bg-red-300 border-red-500' : 'hover:bg-indigo-500 border-blue-500'} rounded hover:text-white px-3 py-1`}>{isLoading ? 'Please wait' : 'Upload'}</button>
              </form>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Photography