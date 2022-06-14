const express= require("express");
const app= express();
const request=require("request");

const bodyParser=require("body-parser");
const http=require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});


//API- Key:- 371e02e7d858640d066145d3c68e515e-us10
//API-ID:- 09fe79af5d
app.post("/",function(req,res){
  const name=req.body.fname+" "+req.body.lname;
  const email=req.body.email;
  const data={
    members:[{
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME: req.body.fname,
        LNAME: req.body.lname
      }
    }
  ]
  };
  const jsonData=JSON.stringify(data);
  const options={
    method:"POST",
    auth: "user69:71e02e7d858640d066145d3c68e515e-us10"

  }
  const url='https://us10.api.mailchimp.com/3.0/lists/09fe79af5d/'
  const reques=http.request(url,options,function(response){
      if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
      }else{ res.sendFile(__dirname+"/failure.html");
    }
  })
reques.write(jsonData);
reques.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT ||3000 ,function(){
  console.log("Server running at port 3000...");
});
