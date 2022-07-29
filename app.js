    
    //All of this are require file just like header of any program when we start the project we have to initiliaze this files
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");                   
const https=require("https");
const { options } = require("request");
const app=express(); 

app.use(express.static("public"));      //This is used when we call the api where the files are on local device
app.use(bodyParser.urlencoded({extended:true}));    //  
    
//This code are used to link html files to the server
app.get("/",function(req,res){              
    res.sendFile(__dirname+"/signup.html")
});
//  This code is used to send the information to the API of the other Website(mailclip)
app.post("/",function(req,res){
    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.email;
    
    var data={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);

    const url=" "; //Copy the website url and unique id from the website

    const options={        //This code is for authentication of the api key and it post the data to the mailclip server
        method:"POST",
        auth:" " //Write your API key here
    }
        //here the http is initialize
    const request=https.request(url,options,function(response){

        // This code is used to display the html pages when we click on the sign up button
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html"); 
        }

            //It send the http request to the server
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
   request.write(jsonData);
   request.end();

});
        //when the operation is failed it returns to the home page
    app.post("/failure",function(req,res){
       res.redirect("/"); 
    })

        //this code is written because it listens the server at port 3000.It is compulsary code to write 
app.listen(3000,function(){
    console.log("Server is running on port 3000");
})



