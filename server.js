const express = require('express')
const {spawn} = require('child_process');
const app = express()

app.get('/getinfo',async (req,res)=>{
    try{
        var dataToSend;
        // spawn new child process to call the python script
        const python = spawn('python', ['version-checker/main.py']);
        // collect data from script
        python.stdout.on('data', function (data) {
         console.log('Pipe data from python script ...');
         dataToSend = data.toString();
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        console.log(dataToSend);
        res.send(dataToSend)
        });
        // const obj={
        //     score:79,
        //     param1:{
        //         text:"According to number of forks",
        //         score:46
        //     },
        //     param2:{
        //         text:"According to recent releases",
        //         score:98
        //     }
        // }
        // res.send(obj);
    }catch(e){
        console.log(e);
    }
})
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started on port ${PORT}`))