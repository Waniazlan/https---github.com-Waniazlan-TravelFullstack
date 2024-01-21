import {useState,useEffect} from 'react';
import axios from'axios';
import AccountNav from './AccountNav';
import PlaceImg from './PlaceImg';
import { format} from 'date-fns';
import {differenceInCalendarDays} from 'date-fns'
import {Link} from 'react-router-dom'
import BookingDate from './BookingDate';

export default function BookingsPage(){
    const [bookings,setBookings] = useState('')

            useEffect(() =>{
                    axios.get('/bookings').then(response =>{
                setBookings(response.data);
            });
        },[])
   
    return(
        <div>
            <AccountNav />
            <div>
                {bookings.length > 0 && bookings.map(booking =>(
                        <Link to={`/account/bookings/${booking._id}`} key={booking} className = "flex gap-4 bg-gray-200 rounded-2xl mb-2 overflow-hidden">
                            <div className='w-48'>
                                <PlaceImg place={booking.place} />
                            </div>
                           <BookingDate booking={booking}/>
                        </Link>
                ))}
            </div>
        </div>
    )}
      