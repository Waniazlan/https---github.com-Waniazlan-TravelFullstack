import {useState} from 'react'

export default function PlaceGallery({place}){
    const [showAllPhoto,setShowAllPhoto] = useState(false)
    
    if(showAllPhoto){
        return(
            <div className="absolute inset-0 bg-black text-white  min-h-screen">
                <div className="p-8 grid gap-4 bg-black text-white ">
                    <div>
                        <h2 className="text-3xl italic ">Photos of {place.title}</h2>
                        <button onClick={() =>setShowAllPhoto(false)} className="flex right-2 gap-1 py-2 px-4 rounded-2xl bg-white text-black fixed shadow  ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            Close Button
                        </button>
                    </div>
                {place?.photos?.length > 0 && place.photos.map((photo,index) =>{
                    return(
                        <div key={index} className=''>              
                        <img className='object-cover' src={'http://localhost:4000/uploads/'+photo}  alt='photo'/>                  
                    </div>
                    )                 
                })}
                </div>               
            </div>
        )
    }


    return(
        <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
            <div>
                {place.photos?.[0] && (
                    <img onClick={() =>setShowAllPhoto(true)} className="cursor-pointer aspect-square object-cover " src={'http://localhost:4000/uploads/'+place.photos[0]}></img>
                )}
            </div>
            <div className="grid ">
            {place.photos?.[1] && (
                    <img onClick={() =>setShowAllPhoto(true)} className="cursor-pointer aspect-square object-cover" src={'http://localhost:4000/uploads/'+place.photos[1]}></img>
                )}
                <div className="overflow-hidden">
                {place.photos?.[2] && (
                    <img onClick={() =>setShowAllPhoto(true)} className="cursor-pointer aspect-square object-cover relative top-2" src={'http://localhost:4000/uploads/'+place.photos[2]}></img>
                )}
                </div>
                
            </div>
        </div>
        <button onClick={() =>{setShowAllPhoto(true)}} className="absolute bottom-2 right-0 lg: flex gap-1 py-2 px-4 border m-2  bg-black text-white rounded-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            Show more Photos
        </button>
        </div>
    )
}