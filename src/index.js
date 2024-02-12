const express=require('express')
require('./db/mongoose.js')
//const User=require('./models/user.js')
const Tasks=require('./models/tasks.js')
const userRouter=require('./routers/users.js')
const taskRouter=require('./routers/task.js')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const multer=require('multer')

const app=express()
const port=process.env.PORT || 3000
const sendMail=require('./sendmail.js')

//app.get('/sendmail',sendMail)

app.use(express.json())
app.use(userRouter) 
app.use(taskRouter)



app.listen(port,()=>{
    console.log('Server is up on port',port)
})




//encrypt password
//jwt use to hide data
// const myFunction=async ()=>{
//     const token=jwt.sign({_id:'abc123'},'thisismynewcourse',{expiresIn:'7 seconds'})
//     console.log(token)

//     const data=jwt.verify(token,'thisismynewcourse')
//     console.log(data)
// }
// myFunction()




//middleware
//  app.use((req,res,next)=>{
//     if(req.method==="GET")
//     {
//          res.send('Get request disabled')
//     }
//     else
//     {
//      next()
//     }
//  })


//image upload example
//const upload=multer({
    //     dest:'images',
    //     limits:{
    //         fileSize:1000000
    //     },
    //     fileFilter(req,file,cb){
    //         if(!file.originalname.match(/\.(doc|docx)$/))
    //         {
    //             return cb(new Error('Please upload wordfile!'))  
    //         }
    
    //         cb(undefined,true)
            
            
    //         // cb(new Error('File must be PDF'))
    //         // cb(undefined,true)
    //         // cb(undefined,false)
    //     }
    // })
    
    
    // app.post('/upload',upload.single('upload'),(req,res)=>{
    //     res.send()
    // },(error,req,res,next)=>{
    //     res.status(400).send({error:error.message})
    // })
    