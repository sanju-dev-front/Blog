const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');

const userRoutes=require('./routes/user');
const blogRoutes=require('./routes/blog');

const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const Blog = require('./models/blog');

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
app.use(express.static(path.join(__dirname,'public')));
//routes
app.get('/', async(req,res)=>{
    const allBlogs=await Blog.find({}).sort({createdAt:-1});
    console.log('All blogs:', allBlogs);
    res.render('home',{ user:req.user ,blogs:allBlogs});
});
app.use('/user', userRoutes);
app.use('/blog', blogRoutes);
app.listen(port,()=>{ 
console.log(`Server is running on port ${port}`)
})