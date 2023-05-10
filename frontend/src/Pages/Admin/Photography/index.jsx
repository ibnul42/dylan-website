import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { createFolder, getFolders, getImages, reset } from '../../../features/asset/assetSlice'

const Photography = () => {
  const dispatch = useDispatch()
  const { folders, assets, isError, message, isFolderCreated } = useSelector((state) => state.asset)
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
      alert(message)
      dispatch(reset())
    } else {
      console.log("default called")
      dispatch(getFolders())
    }
  }, [folders[0]?.name, isFolderCreated, isError])

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
          </div> : <div className="w-full flex gap-2 flex-wrap">
            {assets
              && assets.length > 0 ? assets.map((asset, index) => (
                // <p>{asset.title}</p>
                <div key={index} className="p-1 border h-32 w-32 flex justify-center items-center">
                  <img className='max-h-full max-w-full' src={`http://localhost:5000/api${asset.source}`} alt={asset.title} />
                </div>
              )) :
              <div className='w-full flex flex-col justify-center items-center gap-2'>
                <p>No assets found</p>
                <button className='border border-red-600 hover:bg-red-600 hover:text-white py-2 px-3 rounded'>Delete Folder</button>
              </div>}
          </div>
        }
      </div>
    </div>
  )
}

export default Photography