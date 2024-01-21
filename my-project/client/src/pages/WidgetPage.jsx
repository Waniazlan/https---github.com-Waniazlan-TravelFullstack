import { useState,useContext,useEffect } from "react"
import {differenceInCalendarDays} from 'date-fns'
import { Navigate } from "react-router-dom";
import axios from'axios'
import { UserContext } from "../UserContext";


export default function WidgetPage({place}){

    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [numberOfGuest,setNumberOfGuest] = useState(1);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [redirect,setRedirect] = useState('');
    const {user} = useContext(UserContext)

    useEffect(() =>{
        if(user){
            setName(user.name)
        }
    },[user]);

    let numberOfNights = 0;
    if(checkIn && checkOut){
        const checkInDate = new Date(checkIn)
        const checkOutDate = new Date(checkOut)
        numberOfNights = differenceInCalendarDays(checkOutDate,checkInDate);
        
    }
    async function bookThisPlace(){
        const response =  await axios.post('/bookings',{
            checkIn,checkOut,numberOfGuest,name,phone,
            price:numberOfNights * place.price,
            place:place._id
        })
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`)
       
    }
    if (redirect){
        return <Navigate to={redirect} />
    }

    return(
        <div className="rounded-2xl bg-white text-black p-4 text-center mt-5 ">
                    <h2 className="text-2xl">
                        $ <span className="font-bold">{place.price}</span> / per night
                    </h2>
                    
                    <div className=" border-black rounded-2xl mt-4 ">
                        <div className="flex ">
                            <div className="py-3 px-4">
                            <label >Check In : </label>
                                <input value={checkIn} onChange={e =>setCheckIn(e.target.value)} type='date' />
                            </div>
                            <div className="py-2 px-3 border-l">
                            <label >Check Out : </label>
                                <input value={checkOut} onChange={e =>setCheckOut(e.target.value)} type='date' />
                            </div>

                        </div>
                        <div className="py-3 px-4 border-t">
                            <label>Number Of Guests:</label>
                            
                            <input value={numberOfGuest} onChange={e =>setNumberOfGuest(e.target.value)} type='number'  />
                        </div> 
                        {numberOfNights > 0 && (
                            
                            <div className="py-3 px-4 border-t">
                            <label>Name:</label>
                            <input value={name} onChange={e =>setName(e.target.value)} type='text'  />

                            <label>Phone:</label>
                            <input  value={phone} onChange={e =>setPhone(e.target.value)} type='text'  />
                            </div> 
                        )}                                                                                   
                    </div>                                    
                    <button onClick={bookThisPlace} className="primary font-bold text-1xl">
                        Confirm for booking <br />
                        {numberOfNights > 0 && (
                            <span>${numberOfNights * place.price}</span>
                        )}</button>
                        
                </div>
    )
}