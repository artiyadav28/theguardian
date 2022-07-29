const express = require('express')
const {spawn} = require('child_process');
const app = express()
const bodyParser = require('body-parser')
const path=require('path')
// const httpStatus = require('http-status')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}));
app.post('/versionChecker',async (req,res)=>{
    try{
        const {url}=req.body;
        console.log(url);
        var dataToSend;
//console.log( process.env.PATH );
        // spawn new child process to call the python script

        const python = spawn('python3',['main.py',"github_version",url]);
        // collect data from script
        python.stdout.on('data', function (data) {
         console.log('Pipe data from python script ...');
         dataToSend = data.toString();
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);

        // send data to browser
        // console.log("hi");
        // console.log(dataToSend);
        // const result=JSON.parse(dataToSend);
        console.log(dataToSend);
        res.send(dataToSend);
        });
    }catch(e){
        console.log(e);
    }
})
app.post('/legitPercent',async (req,res)=>{
    try{
        const {url}=req.body;
        console.log(url);
        var dataToSend;
//console.log( process.env.PATH );
        // spawn new child process to call the python script

        const python = spawn('python3',['main.py',"legit_percent",url]);
        // collect data from script
        python.stdout.on('data', function (data) {
         console.log('Pipe data from python script ...');
         dataToSend = data.toString();
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);

        // send data to browser
        // console.log("hi");
        // console.log(dataToSend);
        // const result=JSON.parse(dataToSend);
        console.log(dataToSend);
        res.send(dataToSend);
        });
    }catch(e){
        console.log(e);
    }
})
app.post('/sensitiveinfo',async (req,res)=>{
    try{
        const {url}=req.body;
        console.log(url);
        var dataToSend;
//console.log( process.env.PATH );
        // spawn new child process to call the python script

        const python = spawn('python3',['main.py','sensitive_info',url]);
        // collect data from script
        python.stdout.on('data', function (data) {
         console.log('Pipe data from python script ...');
         dataToSend = data.toString();
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);

        // send data to browser
        // console.log("hi");
        // console.log(dataToSend);
        // const result=JSON.parse(dataToSend);
        console.log(dataToSend);
        res.send(dataToSend);
        });
    }catch(e){
        console.log(e);
    }
})
app.post('/pypi',async (req,res)=>{
    try{
        const {url}=req.body;
        console.log(url);
        var dataToSend;
//console.log( process.env.PATH );
        // spawn new child process to call the python script

        const python = spawn('python3',['main.py','pypi_version',url]);
        // collect data from script
        python.stdout.on('data', function (data) {
         console.log('Pipe data from python script ...');
         dataToSend = data.toString();
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);

        // send data to browser
        // console.log("hi");
        // console.log(dataToSend);
        // const result=JSON.parse(dataToSend);
        console.log(dataToSend);
        res.send(dataToSend);
        });
    }catch(e){
        console.log(e);
    }
})
app.post('/npm',async (req,res)=>{
    try{
        const {url}=req.body;
        console.log(url);
        var dataToSend;
//console.log( process.env.PATH );
        // spawn new child process to call the python script

        const python = spawn('python3',['main.py','npm_version',url]);
        // collect data from script
        python.stdout.on('data', function (data) {
         console.log('Pipe data from python script ...');
         dataToSend = data.toString();
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);

        // send data to browser
        // console.log("hi");
        // console.log(dataToSend);
        // const result=JSON.parse(dataToSend);
        console.log(dataToSend);
        res.send(dataToSend);
        });
    }catch(e){
        console.log(e);
    }
})
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
//     app.get("*", (req, res) => {
//       res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });
// }
// app.use((req, res, next) => {
//     next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
//   });
  
//   // convert error to ApiError, if needed
//   app.use(errorConverter);
  
//   // handle error
//   app.use(errorHandler);
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started on port ${PORT}`))
