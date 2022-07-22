const express = require('express')
const app = express()

app.get('/getinfo',async (req,res)=>{
    try{
        const obj={
            score:79,
            param1:{
                text:"According to number of forks",
                score:46
            },
            param2:{
                text:"According to recent releases",
                score:98
            }
        }
        res.send(obj);
    }catch(e){
        console.log(e);
    }
})
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started on port ${PORT}`))