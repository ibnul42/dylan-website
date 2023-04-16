import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

const images = [
    {
        title: 'item 1',
        source: 'https://images.unsplash.com/photo-1520962922320-2038eebab146?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        title: 'item 2',
        source: 'https://images.unsplash.com/photo-1441239372925-ac0b51c4c250?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=432&q=80'
    },
    {
        title: 'item 3',
        source: 'https://images.unsplash.com/photo-1546587348-d12660c30c50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80'
    },
    {
        title: 'item 4',
        source: 'https://images.unsplash.com/photo-1500828131278-8de6878641b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        title: 'item 5',
        source: 'https://images.unsplash.com/photo-1543877087-ebf71fde2be1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        title: 'item 6',
        source: 'https://images.unsplash.com/photo-1418489098061-ce87b5dc3aee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80'
    },
    {
        title: 'item 7',
        source: 'https://images.unsplash.com/photo-1431411207774-da3c7311b5e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        title: 'item 8',
        source: 'https://images.unsplash.com/photo-1539667468225-eebb663053e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=817&q=80'
    },
    {
        title: 'item 9',
        source: 'https://images.unsplash.com/photo-1516496636080-14fb876e029d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80'
    },
    {
        title: 'item 10',
        source: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    }
]

import cloudinary from 'cloudinary-core';

const cl = new cloudinary.Cloudinary({cloud_name: 'ibnulashir'});

const PhotographDetails = () => {
    const { type } = useParams()

    cl.search({expression: 'folder_name/*', resource_type: 'image'}, (error, result) => {
        if (result && result.resources) {
          const images = result.resources.map(image => cl.url(image.public_id));
          console.log(images); // Array of image URLs
        }
      });
    return (
        <div className='flex-1 my-2'>
            <Helmet>
                <title>{type.charAt(0).toUpperCase().concat(type.slice(1))}  - Dylan Luper</title>
                <link rel="canonical" href="https://www.dylanluper.com/photography" />
            </Helmet>
            <div className="max-w-7xl mx-auto px-2 gap-5 columns-1 md:columns-3">
                {images.map((item, index) => (
                    <div key={index} className="mb-3">
                        <img src={item.source} className="w-full rounded-md object-cover" alt="" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PhotographDetails