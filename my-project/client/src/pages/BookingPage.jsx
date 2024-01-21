import { useEffect,useState } from 'react'
import {useParams} from 'react-router-dom'
import AddressPage from './AddressPage'
import axios from 'axios'
import {format} from 'date-fns'
import {differenceInCalendarDays} from 'date-fns'
import BookingDate from './BookingDate'
import PlaceGallery from './PlaceGallery'

export default function BookingPage(){
  const {id} = useParams()
  const [booking,setBooking] = useState(null)

  useEffect(() =>{
    if(id){
        axios.get('/bookings').then(response =>{
            const foundBooking = response.data.filter(({_id}) => _id === id);
            if(foundBooking){
                setBooking(foundBooking)
            }
        });
    }
  },[id]);

  if(!booking){
    return '';

    }
      return(
        <div>
            {booking.length > 0 && booking.map(book =>{
                return(
                    <div key={book} className='my-8'>             
                    <div className='bg-red-50  py-2 px-3 mt-3 mb-4 rounded-2xl '>
                            <h2 className='text-xl font-semibold'>Your booking information</h2>
                        <BookingDate booking={book} /> 
                        <AddressPage className='my-2 block'>{book.place.address}</AddressPage>   
                    </div>
                    <PlaceGallery place={book.place} />
                
                    </div>
                )
                
            })}
        </div>
      )
         }