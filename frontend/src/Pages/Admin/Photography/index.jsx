import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { addAssets, createFolder, getFolders, getImages, removeAsset, removeFolder, reset } from '../../../features/asset/assetSlice'
import { toast } from 'react-toastify'

const Photography = () => {
  const dispatch = useDispatch()
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { folders, assets, isError, message, isFolderCreated, isAssetAdded, isAssetDeleted, isFolderDeleted } = useSelector((state) => state.asset)
  const [currentType, setCurrentType] = useState(null)

  const [typeText, setTypeText] = useState('')
  const [createType, setCreateType] = useState(false)

  // const []


  useEffect(() => {
    if (currentType === null && folders.length > 0) {
      setCurrentType(folders[0].name)
      dispatch(getImages(folders[0].name))
    } else if (isFolderCreated) {
      console.log("isFolderCreated called")
      setCreateType(false)
      setTypeText('')
      dispatch(reset())
      dispatch(getFolders())
    } else if (isError) {
      console.log("isError called")
      toast.error(message)
    } else if (isAssetAdded) {
      toast.success(message)
      // alert(message)
      dispatch(reset())
      dispatch(getImages(currentType))
    } else if (isAssetDeleted) {
      toast.success(message)
      // alert(message)
      dispatch(reset())
      dispatch(getImages(currentType))
    } else if (isFolderDeleted) {
      toast.success(message)
      // alert(message)
      dispatch(reset())
      dispatch(getFolders())
    } else {
      console.log("default called")
      dispatch(getFolders())
    }
  }, [folders[0]?.name, isFolderCreated, isError, isAssetAdded, isAssetDeleted, isFolderDeleted])

  const onTypeChange = (item) => {
    setCurrentType(item.name)
    dispatch(getImages(item.name))
  }

  const onTypeCancel = () => {
    setTypeText('')
    setCreateType(false)
  }

  const onTypeCreate = () => {
    // console.log(typeText.trim())
    dispatch(createFolder(typeText.trim()))
    // setCreateType(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append each selected file to the FormData object
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append(`photos`, selectedFiles[i]);
    }
    dispatch(addAssets({ currentType, formData }))
  }

  const onDeleteImage = (item) => {
    console.log(item)
    dispatch(removeAsset({
      type: item.type,
      file: item.title
    }))
  }

  const onDeleteFolder = () => {
    dispatch(removeFolder({ dir: currentType }))
  }

  return (
    <div className='p-2 pr-6 flex flex-col h-full'>
      <div className="flex justify-between">
        <p className='font-semibold text-lg'>All types</p>
        <button className='bg-teal-600 hover:bg-teal-700 text-stone-50 py-2 px-3 rounded' onClick={() => setCreateType(true)}>Create</button>
      </div>
      <div className="flex flex-wrap gap-1 py-3">
        {folders && folders.length > 0 && folders.map((item, index) => (
          <button key={index} className={`${currentType === item.name ? 'bg-sky-700' : 'bg-sky-500'} hover:bg-sky-700 text-stone-50 py-2 px-3 rounded`} onClick={() => onTypeChange(item)}>{item.name.split("_").join(" ")}</button>
        ))}
      </div>
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
            <div className="flex gap-2 flex-wrap">
              {assets
                && assets.length > 0 ? assets.map((asset, index) => (
                  <div key={index} className="p-1 border h-32 w-32 flex justify-center items-center relative">
                    <img className='max-h-full max-w-full' src={`http://localhost:5000/api${asset.source}`} alt={asset.title} />
                    <div className="absolute h-full w-full opacity-0 hover:opacity-100 backdrop-blur-sm flex justify-center items-center">
                      <button onClick={() => onDeleteImage(asset)}>
                        <img src="/assets/delete.svg" className='h-10 w-10' alt="" />
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
                <button type="submit">Upload</button>
              </form>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Photography