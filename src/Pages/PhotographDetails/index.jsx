import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

const images = [
    {
        title: 'item 1',
        type: 'Concert',
        source: 'https://images.unsplash.com/photo-1634538748961-b7bfaa05af81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'
    },
    {
        title: 'item 2',
        type: 'Landscape',
        source: 'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
    },
    {
        title: 'item 3',
        type: 'Concert',
        source: 'https://images.unsplash.com/17/unsplash_5252bb51404f8_1.JPG?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        title: 'item 4',
        type: 'people',
        source: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        title: 'item 5',
        type: 'Industrial',
        source: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        title: 'item 6',
        type: 'people',
        source: 'https://images.unsplash.com/photo-1517732306149-e8f829eb588a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'
    },
    {
        title: 'item 7',
        type: 'Industrial',
        source: 'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80'
    },
    {
        title: 'item 8',
        type: 'people',
        source: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        title: 'item 9',
        type: 'Industrial',
        source: 'https://images.unsplash.com/photo-1511454493857-0a29f2c023c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        title: 'item 10',
        type: 'Landscape',
        source: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        title: 'item 11',
        type: 'people',
        source: 'https://images.unsplash.com/photo-1674574124345-02c525664b65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        title: 'item 12',
        type: 'people',
        source: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
    },
    {
        title: 'item 13',
        type: 'Industrial',
        source: 'https://images.unsplash.com/photo-1501523460185-2aa5d2a0f981?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=931&q=80'
    },
    {
        title: 'item 13',
        type: 'Industrial',
        source: 'https://images.unsplash.com/photo-1493476523860-a6de6ce1b0c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
    },
    {
        title: 'item 14',
        type: 'Concert',
        source: 'https://images.unsplash.com/photo-1501527459-2d5409f8cf9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        title: 'item 15',
        type: 'Concert',
        source: 'https://images.unsplash.com/photo-1523198421516-973dc001a953?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80'
    },
    {
        title: 'item 15',
        type: 'Concert',
        source: 'https://images.unsplash.com/photo-1563841930606-67e2bce48b78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80'
    },
    {
        title: 'item 16',
        type: 'Landscape',
        source: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        title: 'item 17',
        type: 'Landscape',
        source: 'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1042&q=80'
    },
    {
        title: 'item 18',
        type: 'Landscape',
        source: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        title: 'item 19',
        type: 'Landscape',
        source: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
]

import cloudinary from 'cloudinary-core';

// const cl = new cloudinary.Cloudinary({cloud_name: 'ibnulashir'});

const PhotographDetails = () => {
    const { type } = useParams()
    const [filteredImages, setFilteredImages] = useState([])

    useEffect(() => {
        setFilteredImages(images.filter((item) => item.type.toLocaleLowerCase() === type.toLocaleLowerCase()))
    }, [])

    // cl.search({expression: 'folder_name/*', resource_type: 'image'}, (error, result) => {
    //     if (result && result.resources) {
    //       const images = result.resources.map(image => cl.url(image.public_id));
    //       console.log(images); // Array of image URLs
    //     }
    //   });
    return (
        <div className='flex-1 my-2'>
            <Helmet>
                <title>{type.charAt(0).toUpperCase().concat(type.slice(1))}  - Dylan Luper</title>
                <link rel="canonical" href="https://www.dylanluper.com/photography" />
            </Helmet>
            <div className="max-w-7xl mx-auto px-2 gap-5 columns-1 md:columns-3">
                {filteredImages.map((item, index) => (
                    <div key={index} className="mb-3">
                        <img src={item.source} className="w-full rounded-md object-cover" alt="" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PhotographDetails