const express=require('express');
const path=require('path');
const userRoutes=require('./routes/user');
const mongoose=require('mongoose');

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

//routes
app.get('/',(req,res)=>{
    res.render('home');
});
app.use('/user', userRoutes);

app.listen(port,()=>{ 
console.log(`Server is running on port ${port}`)
})