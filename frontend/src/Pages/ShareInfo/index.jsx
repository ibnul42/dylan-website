import React from 'react'
import { Helmet } from 'react-helmet-async'

const ShareInfo = () => {
  return (
    <div className='flex-1 my-2'>
      <Helmet>
        <title>Share Information - Dylan Luper</title>
        <link rel="canonical" href="https://www.dylanluper.com/shareinfo" />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-2 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="col-span-1 flex flex-col gap-3 justify-center items-center">
          <p className='text-2xl md:text-4xl font-semibold'>What's Up!</p>
          <p className='max-w-md font-semibold text-gray-500 text-center'>I am a independent photographer/ videographer currently based out of Winston-Salem, NC.</p>
        </div>
        <div className="col-span-1 flex justify-center">
          <img src="/assets/about.jpg" alt="profile" className='md:max-h-[calc(100vh-200px)] object-cover object-top rounded-lg' />
        </div>
      </div>
    </div>
  )
}

export default ShareInfo