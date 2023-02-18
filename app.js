const express =require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app= express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    const city =  req.body.cityName;
    const apiKey="3e2d94e013f45004548d9402c8e3ff4d"
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);
         

    response.on("data",function(data){
        const weatherData = JSON.parse(data)
        const temp=weatherData.main.temp
        const weathDesc = weatherData.weather[0].description
        const icon=weatherData.weather[0].icon
        const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write("<p> The weather is currently "+weathDesc+"<p/>")
        res.write("<h1> The Temperature in "+city+" is "+temp+" degrees Celcious.</h1>")
        res.write("<img src="+imageURL+">");
        res.send();
    })
    })
});

app.listen(3000,function(){
    console.log("Server is running on port 3000.")
});