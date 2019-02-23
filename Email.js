let express=require("express");
 let app= express();
 let path=require("path");
let bodyparser=require("body-parser");
let fs=require ("fs");


app.use(bodyparser.urlencoded({ extended: false}));


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"Email.html"));
 
}) 
app.post('/Login',(req,res)=>{
 
   const Form ={
       Username:req.body.Username,
       Email:req.body.Email,
       Password:req.body.Password,
       confirmedPassword:req.body.confirmedPassword
   };
   var noteString=JSON.stringify(Form);
   fs.writeFileSync("note.json",noteString);
 
   //
   const wrong=fs.readFileSync("note.json");
   const note=JSON.parse(wrong);
   console.log(typeof note);
   console.log(note.Username,note.Email,note.Password,note.confirmedPassword);
   
   
 if(req.body.Password==req.body.confirmedPassword){

    console.log("Login");
    res.redirect("/free"); 
 
    
} 
   else{

console.log("Wrong password");
res.status(404).send("<h1>password and Email id is mismatch</h1>");

   }
   app.get("/free",(req,res)=>{
       res.send('<h1>Username<h1>:'+note.Username+
       '<h2>Email id<h2>:'+note.Email+ '<h4>Password</h4>:'
       +note.Password+'<h3>The Confirmed password</h3>:'
       +note.confirmedPassword);
   })
    
})
     
   
app.listen(8000);
console.log("Runnning!!!!!!!!!!!!!!!!!");
