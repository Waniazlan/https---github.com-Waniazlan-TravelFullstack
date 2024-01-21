import {Link,useParams,Navigate } from 'react-router-dom';
import {useContext,useState} from "react";
import {UserContext} from "../UserContext";
import Places from "./Places"
import AccountNav from './AccountNav'
import axios from 'axios'

export default function ProfilePage(){
    const {ready,user,setUser} = useContext(UserContext);
    const [redirect,setRedirect] = useState(null)
    let {subpage} = useParams();
    if(subpage === undefined){
        subpage = 'profile';  
    }

    if(!ready){
        return 'loading...';
    }

    if(ready && !user && !redirect){
        return <Navigate to={'/login'} />
    }

    if(redirect){
        return <Navigate to={redirect} />
    }
    
        if(redirect){
            return <Navigate to={redirect} />
        }

        async function logout(){
            await axios.post('/logout');
            setRedirect('/')
            setUser(null)
        }
         

    return(
       <div>
        <AccountNav />
        {subpage === 'profile' && (
            <div className=" text-center  max-w-lg mx-auto ">
                Logged in as {user.name} ({user.email}) <br />
                <button onClick={logout} className=" primary mt-4 max-w-sm " > Logout</button>
            </div>
        )}
        {subpage === 'Places' && (
            <Places />
        )}
       </div>
    )
}