const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');

const userRoutes=require('./routes/user');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

mongoose.connect('mongodb://localhost:27017/blog').then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.error('Error connecting to MongoDB:', err);
});

const app=express();

const port=3000;

// view setup
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// middleware
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
//routes
app.get('/',(req,res)=>{
    res.render('home',{ user:req.user});
});
app.use('/user', userRoutes);

app.listen(port,()=>{ 
console.log(`Server is running on port ${port}`)
})