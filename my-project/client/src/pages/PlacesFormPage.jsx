import {useState,useEffect} from 'react'
import Perks from './Perks'
import PhotosUploader from "./PhotoUploader"
import AccountNav from './AccountNav';
import axios from 'axios'
import {Navigate,useParams} from 'react-router-dom'

export default function PlacesFormPage(){

    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([])
    const [descriptions,setDescription] = useState('');
    const [perks,setPerk] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [redirect,setRedirect] = useState(false)
    const [price,setPrice] = useState(100);
    const {id} =useParams()
    

    useEffect(() =>{
        if(!id){
            return
        }
        axios.get('/places/'+id).then(response =>{
            const {data} = response;
            setTitle(data.title);
            setAddedPhotos(data.photos);
            setAddress(data.address);
            setDescription(data.descriptions);
            setPerk(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGueast);
            setPrice(data.price);
        })
    },[id])

    function inputHeader(text){
        return(
            <h2 className='text-xl mt-4'>{text}</h2>
        );
    }
    function inputDescription(text){
        return(
            <p className='text-gray-500 text-sm'>{text}</p>
        );
    }

    function preInput(header,description){
        return(
            <>
            {inputHeader(header)}
            {inputDescription(description)}
            </>
        );
    }
    async function savePlace(e){
        e.preventDefault();
        const placeData = {
            title,address,addedPhotos,descriptions,perks
            ,extraInfo,checkIn,checkOut,maxGuests,price
        };
        if(id){
            await axios.put('/places/:id',{
                id, ...placeData           
            });
            setRedirect(true)
        }else{
            await axios.post('/places',placeData);
            setRedirect(true);
        }    
    }

    if(redirect){
        return<Navigate to={'/account/places'} ></Navigate>
    }

    return(
        <div>
            <AccountNav />
        <form onSubmit={savePlace}>
            {preInput('Title','Add the name of your desire places')}
            <input type='text' value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' />

            {preInput('Address',"Add the Address of your desire places")}
            <input type='text' value={address} onChange={e =>{setAddress(e.target.value)}}placeholder='Address' />

            
            {preInput('Photos',"More is fun")}
           <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
            
            
            {preInput('Description',"Descrip yourplaces")}
            <textarea value={descriptions} onChange={e =>{setDescription(e.target.value)}}className='mt-2 w-full h-32'></textarea>
    
            {preInput('Perks',"select all ofthe perks of your places")}                       
            <Perks selected={perks} onChange={setPerk}/>
           
            {preInput('Extra info',"Anything you wanna add")}                     
            <textarea value={extraInfo} onChange={e =>{setExtraInfo(e.target.value)}} className='mt-2 w-full h-32'></textarea>
            
            {preInput('Check in&out times',"Add check in and out")}  
            <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                <div>
                <h3 className='mt-2 -mb-2'>Check in time</h3>
                <input type='text' value={checkIn} onChange={e =>{setCheckIn(e.target.value)}} placeholder='14:00'></input>
                </div>
                <div>
                <h3 className='mt-2 -mb-2'>Check out time</h3>
                <input type='text' value={checkOut} onChange={e =>{setCheckOut(e.target.value)}} placeholder='12:00'></input>
                </div>
                <div>
                <h3 className='mt-2 -mb-2'>Max number of guest</h3>
                <input type='text' value={maxGuests} onChange={e =>{setMaxGuests(e.target.value)}} placeholder='14:00'></input>
                </div> 
                <div>
                <h3 className='mt-2 -mb-2'>Price per night</h3>
                <input type='text' value={price} onChange={e =>{setPrice(e.target.value)}} placeholder='$'></input>
                </div> 
            </div>                      
                <button className='bg-primary mt-4 w-full rounded-2xl py-1'>Save</button>                   
        </form>
    </div>
    )
}