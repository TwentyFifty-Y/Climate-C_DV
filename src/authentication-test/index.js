//This works with Thunder client with GET-request
//First start it with node index.js in terminal or command prompt
//Then head to Thunder Client (or browser) 
//With GET localhost:3000 you see hello world
//With GET localhost:3000/protected you get unauthorized until you 'sign in' in auth tab
//If in browser, a pop up sign in appears
//You can acces the protected content by using the username and password in array if you want to check how it works

 

const express = require('express');
const { authenticate } = require('passport');
const app = express();
const port = 3000;
const passport=require('passport');
const { BasicStrategy } = require('passport-http');
const basicStrategy=require('passport-http').BasicStrategy

//This is what executes before starting the app, not necessary but if we want to do something with it
app.use((req,res,next) => {
    console.log("Is this a middleware?");
    next(); 
});
//This array is for testing purposes, we have a database table users
const users=[{
    id:"1",
    username:"testuser",
    password:"password"
},
{
    id:"2",
    username:"anotheruser",
    password:"123456"
},
]
//This is a middleware
passport.use(new BasicStrategy(
    function(username,password,done){
        //This is something to see what is happening in console 
        console.log("Username: "+ username)
        console.log("Password: "+password)
        //Here we need to search username through database
        const user=users.find(u=> u.username ===username)
        //If username is found, start searching password to match
        if(user !=null){
            if(user.password===password){
                done(null,user); //match found, connection allowed
            }else{
                done(null,false) //password match not found, connection denied
            }

        }else {
            done(null,false);//username match not found, access denied
        }
    }
))
//Not protected content, visibly for everyone
app.get('/', (req, res) => {
  res.send('Hello World!');
})
//Protected content, visibly after authentication
app.get('/protected',passport.authenticate('basic',{session:false}), (req,res)=> {
    console.log("You got in.");
    res.send('This is super-duper protected.');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})