import axios from 'axios';
import { useEffect,useState } from 'react';
import {Link} from 'react-router-dom'
import AccountNav from './AccountNav';
import PlaceImg from './PlaceImg'



export default function Places(){

    const[places, setPlaces] = useState([])
    useEffect(() =>{
        axios.get('/user-places').then(({data}) =>{
            setPlaces(data)

        });
    },[]);

    return(
        <div>
            <AccountNav/>
            
            <div className="text-center">
                <Link className='rounded-full text-white inline-flex gap-2 bg-primary py-2 px-3' to={'/account/places/new'}> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                 </svg>

                Add new Places
                </Link>
            </div>  
            <div className='mt-6'>
            {places.length > 0 && places.map(place =>{
                return(
                    
                        <Link to={'/account/places/'+place._id} key={place} className='bg-gray-200 gap-2 flex p-4 cursor-pointer rounded-2xl text-black '>
                    <div className='w-33 h-32 flex grow shrink-0 '>
                        <PlaceImg place={place}/>
                    </div>
                   <div className='grow-0 shrink'>
                   <h2 className='text-xl'>{place.title}</h2>
                    <p className='text-sm mt-2'>{place.descriptions}</p>        
                   </div>
                 
                </Link>
                )
             
                    
                
                        })}
            </div>         
        </div>
         )
        }