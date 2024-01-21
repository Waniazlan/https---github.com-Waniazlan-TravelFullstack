const express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose')
const User = require('../api/models/User')
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownload = require('image-downloader');
const multer = require('multer');
const bcryptSalt  =bcrypt.genSaltSync(10);
const jwtSecret = "123klndfonfkl123";
const fs = require('fs');
const Booking = require('./models/Bookings')
const Place = require('./models/Place')

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"],

}))


 mongoose.connect(process.env.MONGO_URL)

 function getUserDataReq(req){
    return new Promise((resolve,reject) =>{
        jwt.verify(req.cookies.token, jwtSecret, {}, async(err,userData)=>{
            if(err) throw err;
            resolve(userData);
        });
    });
}

app.get('/test', (req,res)=>{
    res.json('test ');
})
app.post('/register',async (req,res)=>{
    
    const {name, email, password} = req.body;
    const userDoc = await User.create({
        name, 
        email,
        password:bcrypt.hashSync(password, bcryptSalt)
    })
    res.json(userDoc);
});

app.post('/login',async (req,res) =>{
    
    const{email, password} = req.body
    const userDoc= await User.findOne({email})
    if(userDoc){
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if(passOk){
            jwt.sign({email:userDoc.email,
                 id:userDoc._id}, jwtSecret, {},(err,token) =>
                 {
                if(err) throw err;
                res.cookie('token', token).json(userDoc)
            })
        }else{
            res.json('pass not found')
        }
        
    }else{
        res.json('user not found')
    }
})

app.get('/login',(req,res) =>{
    
    const {token} =req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async(err,userData)=>{
            if(err) throw err;
            const {name, email,_id}= await User.findById(userData.id);
            res.json({name,email,_id});
        });
    }else{
        res.json(null);
    }
})
app.post('/logout', (req,res) =>{
    res.cookie('token', '').json(true);
});


app.post('/upload-by-link',async(req,res) =>{
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownload.image({
        url:link,
        dest:__dirname +'/uploads/'+ newName,
    });
    res.json( newName);
})

const photosMiddleware = multer({dest:'uploads/'})
app.post('/upload', photosMiddleware.array('photos',100),(req,res) =>{
const uploadFiles = [];
for(let i = 0; i < req.files.length; i++){
    const {path, originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadFiles.push(newPath.replace('/uploads',''));
    

}
res.json(uploadFiles);
})

app.post('/places',(req,res) =>{

    const {token} =req.cookies;
    const {
        title,address,addedPhotos,descriptions,perks
        ,extraInfo,checkIn,checkOut,maxGuest,price
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async(err,userData)=>{
            if(err) throw err;           
           const placeDoc = await Place.create({
                    owner:userData.id,title,address,
                    photos:addedPhotos,descriptions,perks
                    ,extraInfo,checkIn,checkOut,maxGuest,price
            })
            res.json(placeDoc);
        });
});

app.get('/user-places',(req,res) =>{
    const {token} =req.cookies;
    jwt.verify(token, jwtSecret, {}, async(err,userData)=>{
        if(err) throw err;
   const {id} = userData;
   res.json( await Place.find({owner:id}));
    });  
    
}) 

app.get('/places/:id',async (req,res)=>{
    const {id} =req.params;
    res.json(await Place.findById(id))
})

app.put('/places/:id', async (req,res) =>{
    const {token} =req.cookies;
    const {
        id,title,address,addedPhotos,descriptions,perks
        ,extraInfo,checkIn,checkOut,maxGuest,price
    } = req.body;   
    jwt.verify(token, jwtSecret, {}, async(err,userData)=>{
        if(err) throw err;
        const placeDoc = await Place.findById(id)
        if(userData.id === placeDoc.owner.toString()){
            placeDoc.set({
        title,address,photos:addedPhotos,descriptions,perks
        ,extraInfo,checkIn,checkOut,maxGuest,price
            });
            placeDoc.save();
            res.json('ok');
        }
});
})

app.get('/places',async(req,res)=>{
    res.json( await Place.find());
})

app.post('/bookings' ,async (req,res) =>{
    const userData = await getUserDataReq(req)
    const {place,checkIn,checkOut,numberOfGuest,name,phone,price} 
    = req.body
 Booking.create({place,
    checkIn,checkOut,numberOfGuest,name,phone,price,user:userData.id
            }).then((doc) =>{    
        res.json(doc)
    }).catch((err) =>{
        throw err;
    });
});


app.get('/bookings',async (req,res) =>{
    const userData = await getUserDataReq(req);
    res.json( await Booking.find({user:userData.id}).populate('place'))
})
    



app.listen(4000);
