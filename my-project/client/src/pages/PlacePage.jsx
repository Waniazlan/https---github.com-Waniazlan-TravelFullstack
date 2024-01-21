import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AddressPage from "./AddressPage";
import PlaceGallery from "./PlaceGallery";
import WidgetPage from "./WidgetPage";

export default function PlacePage(){
    const {id} = useParams();
    const [place,setPlace] = useState('');
    
    
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get(`/places/${id}`).then(response =>{
            setPlace(response.data)
        })
    },[id]);
  
    return(
        <div className="mt-8 bg-gray-100 -mx-8 p-8 py-8">
            <h1 className="text-2xl mb-2 ">{place.title}</h1>
            <a className="block font-semibold underline mb-3" 
            target='_blank' href={'http://map.google.com/?g='+place.address}>{place.address}</a>
           <PlaceGallery place={place} />
           
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_1fr]">
            <div >
            <AddressPage>{place.address}</AddressPage>                          
            <div className="mt-2 mb-2 ">
                   Check In: {place.checkIn}PM <br />
                   Check Out: {place.checkOut}PM <br />
                   Max Guests: {place.maxGuests} <br />               
            </div>
            <div className="bg-white rounded-2xl text-black mt-6 py-3 px-3  border-t-2 border-gray ">
            <h2 className="font-semibold text-2xl">Extra Info</h2>
            <div className="leading-5 mt-2 mb-2 text-sm ">
            {place.extraInfo}
            </div>
                
            </div> 
            </div>
                <WidgetPage place={place}/>

                
            </div>
        </div>
    )
}