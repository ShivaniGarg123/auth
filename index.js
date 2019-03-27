const express=require('express');
const app=express();
require('./services/passport');




//mongodb setup
const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost/authdb',{useNewUrlParser:true});


//cookie-session
const keys=require('./config/keys');
const cookieSession=require('cookie-session');
const passport=require('passport');
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

const authRoutes=require('./routes/authRoutes');
authRoutes(app);

app.listen(5000,()=>{
    console.log("server running on port ....");
});