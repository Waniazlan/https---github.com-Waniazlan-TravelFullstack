import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'



export default function IndexPage() {
  const [places,setPlaces] = useState([])
  useEffect(()=>{
    axios.get('/places').then(response=>{
      setPlaces(response.data)
    })
  },[]);
  return (
         <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {places.length > 0 && places.map((place,index) =>(            
                <Link to={'/place/'+place._id} key={index}>
                <div className='bg-gray-500 rounded-2xl flex' >
                  {place.photos?.[0] &&(
                        <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:4000/uploads/'+place.photos[0]}  alt='photo'/>
                  )}
                </div>    
                <h2 className='font-bold mt-2'>{place.title}</h2>
                <h3 className='text-sm flex gap-1 text-gray-500'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>

                  {place.address}
                </h3> 
                <div className='mt-1'>
                        <span className='font-bold'>${place.price}</span> per night
                </div>
                                               
                                              
                  
                </Link>
            ))}
         </div>
  );
}

