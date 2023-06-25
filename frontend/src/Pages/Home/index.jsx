import React from 'react'
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

const Home = () => {
  const texts = ['Global Logistics Extraordinaire', 'Home Theater Geek', 'Computer Enthusiast', 'Photographer', 'Creative', 'Creative', 'Tuffer', 'Stylist']
  return (
    <div className='flex-1 my-2'>
      <Helmet>
        <title>Home - Dylan Luper</title>
        <link rel="canonical" href="https://www.dylanluper.com" />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-2 font-semibold">
        <div className="my-2 flex flex-col items-center gap-3">
          <p className='text-center text-2xl md:text-4xl'>Dylan Luper</p>
          <div className="my-3">
            <Typewriter
              options={{
                strings: texts,
                autoStart: true,
                loop: true,
                delay: 80,
                deleteSpeed: 70,
                cursor: '|',
                skipAddStyles: false,
                wrapperClassName: 'text-2xl text-bold',
                cursorClassName: 'text-bold text-3xl'
              }}
            />
          </div>
        </div>
        <div className="my-2 grid gap-5 md:gap-10 grid-cols-1 md:grid-cols-2">
          <div className="col-span-1 rounded-md overflow-hidden flex flex-col items-center">
            <Link to="/photography"><img src="/assets/photography.jpg" alt="" srcSet="" className='w-full h-[60vh] max-h-[450px] object-contain object-left' /></Link>
            <p className='my-2 text-center'>Photography</p>
          </div>
          <div className="col-span-1 rounded-md overflow-hidden flex flex-col items-center">
            <Link to="/photography"><img src="/assets/rug.png" alt="" srcSet="" className='w-full h-[60vh] max-h-[450px] object-cover object-left' /></Link>
            <p className='my-2 text-center'>Rug-Making / Tufting</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home