import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAssets, getFolders } from '../../features/asset/assetSlice'
import config from '../../../config'

const Photography = () => {
  const dispatch = useDispatch()

  const { folders, assets } = useSelector((state) => state.asset)

  const [alltypes, setAlltypes] = useState([])

  useEffect(() => {
    if (folders.length > 0 && assets.length > 0) {
      const folderFiltered = folders.filter(item => item.name !== 'rug_making')
      let types = [];
      for (let i = 0; i < folderFiltered.length; i++) {
        const targetAssets = assets.filter((asset) => asset.type === folderFiltered[i].name);
        const source = targetAssets.length > 0 ? targetAssets[0].source : null;
        types.push({ ...folderFiltered[i], source });
      }
      setAlltypes(types);
    } else {
      dispatch(getFolders())
      dispatch(getAssets())
    }
  }, [folders[0]?.name, assets[0]?.title])
  return (
    <div className='flex-1 my-2'>
      <Helmet>
        <title>Photography - Dylan Luper</title>
        <link rel="canonical" href="https://www.dylanluper.com/photography" />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-2 font-semibold">
        <div className="my-2 grid gap-5 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {alltypes && alltypes.length > 0 && alltypes.map((item, index) => (
            <div key={index} className="col-span-1 rounded-md overflow-hidden">
              <Link to={`/photography/${item.name.toLocaleLowerCase()}`} className='w-full h-[75vh] max-h-96 flex justify-center'><img src={`${import.meta.env.VITE_REACT_DOMAIN_URL}/assets/${item?.name}/thumbnail.jpg`} alt={item.name} srcSet="" className='h-full w-full object-cover object-center' />
              </Link> 
              <div className="flex justify-between items-center font-semibold my-2">
                <p className='text-lg capitalize'>{item.name.split('_').join(' ')}</p>
                {item.moto && <p className='hidden md:block'>{item.motto}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Photography