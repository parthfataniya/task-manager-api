const express=require('express')
const router=new express.Router()
const User=require('../models/user.js')
const auth=require('../middleware/auth.js')
const multer=require('multer')
//const sharp=require('sharp')
//get method for all users
router.get('/users/me',auth,async (req,res)=>{
   res.send(req.user)
   
   
   
   
   
   
    // try
    // {
    //     const user=await User.find({})
    //     res.send(user)
    // }
    // catch(e)
    // {
    //     res.send("Error!")
    // }
   
   
    // User.find({}).then((user)=>{
    //     res.send(user)
    // }).catch((error)=>{
    //     res.send("Error!")
    // })
})

//get method for particular user which match with id
router.get('/users/:id',async (req,res)=>{
    const _id=req.params.id
    
    try
    {
        const user=await User.findById(_id)
        if(!user)
        {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch (e)
    {
        res.status(404).send()
    }
    // User.findById(_id).then((user)=>{
    //     if(!user){  
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((error)=>{ 
    //     res.status(500).send("Error") 
    // })
    
})

router.post('/users',async (req,res)=>{
    const user=new User(req.body)


    try
    {
        
        await user.save()
        const token=await user.generateAuthToken()
        res.send({user,token})
    }
    catch (e)
    {
        res.status(400).send(e)
    }
    
//before await i use below method 
    // user.save().then(()=>{
    //     res.send(user)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    //     res.send(error)
    // })
})

//login router
router.post('/users/login',async (req,res)=>{
    try
    {
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()

        res.send({user,token}) 
    }              
    catch (e)
    {
        res.status(400).send(e)
    }
})

router.post('/users/logout',auth,async (req,res)=>{
    try
    {
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })

        await req.user.save()

        res.send()
    }
    catch (e)
    {
        res.status(500).send()
    }
})

router.post('/users/logoutall',auth,async (req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }catch (e)
    {
        res.status(500).send()
    }
})

router.patch('/users/me',auth,async (req,res)=>{
    const updates=Object.keys(req.body)
    const allowupdates=['name','email','password','age']
    const isvalid=updates.every((update)=>{
        return allowupdates.includes(update)
    })

    if(!isvalid)
    {
        return res.status(400).send('error:Invalid update')
    }
    


    
    try
    {
        

        updates.forEach((update)=>{
            req.user[update]=req.body[update]
        })

        await req.user.save()
        //const user=await User.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        
        res.send(req.user)
    }
    catch(e)
    {
        res.status(400).send()
    }
})

router.delete('/users/me', auth ,async (req,res)=>{
    try
    {
        await req.user.deleteOne()
        res.send(req.user)
    }
    catch (e)
    {
        res.status(500).send(e)
    }  

})

//image valiation
const avtar=multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
         if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
         {
             return cb(new Error('Image must be jpg,jpeg,png!'))
         }
       

        cb(undefined,true)
    }
})

//for upload images for particular user
router.post('/users/me/avtar',auth,avtar.single('avtar'),async (req,res)=>{
    req.user.avatar=req.file.buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

//remove profile from user
router.delete('/users/me/avtar',auth,async (req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.get('/users/:id/avtar',async (req,res)=>{
    try
    {
        const user=await User.findById(req.params.id)
        if(!user || !user.avatar)
        {
            throw new Error()
        }

        res.set('Content-Type','image/jpg')
        res.send(user.avatar)
    }
    catch (e)
    {
        res.status(404).send()
    }
})

module.exports=router