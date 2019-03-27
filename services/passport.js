const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const keys=require('../config/keys');
const Users=require('../models/Users');

passport.serializeUser((users,done)=>{
    done(null,users.id)
});
passport.deserializeUser((id,done)=>{
    Users.findById(id).then((users)=>{
        done(null,users);
    })
});




passport.use(new GoogleStrategy({
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret,
    callbackURL:'/auth/google/callback'
},function(accessToken,refreshToken,profile,done){

  Users.findOne({googleID:profile.id}).then((currentUser)=>{
      if(currentUser){
          console.log(currentUser);
      }else {
          new Users({
              googleID: profile.id,
              name:profile.displayName
          }).save().then((newUser)=>{
              console.log('new user created: ' + newUser);
          })

      }
  })}));




