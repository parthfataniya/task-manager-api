const express=require('express')
const router=new express.Router()
const Tasks=require('../models/tasks.js')
const auth=require('../middleware/auth.js')

//get method for all tasks
//GET /tasks?completed=true filter data
//GET /tasks?limit=10&skip=0 pagination data
//GET /tasks?sortBy=createdAt:desc sorting data
router.get('/tasks',auth,async (req,res)=>{
    const match={}
    const sort={}
    const {limit,skip}=req.query
    try
    {
       
        //filter page
        if(req.query.completed)
        {
        
            match.completed=req.query.completed==='true'?true:false
            
            if(req.query.sort)
            {
                const part=req.query.sort.split(':')
                sort[part[0]]=part[1]==='desc'?-1:1
            }

            const task1=await Tasks.find({
                owner:req.user._id,
                completed:match.completed,     
            },
            null,
            {
                limit,
                skip,
                sort:sort
            })
            res.send(task1)
        }
        else
        {
            if(req.query.sort)
            {
                const part=req.query.sort.split(':')
                sort[part[0]]=part[1]==='desc'?-1:1
            }
            const task1=await Tasks.find({
                owner:req.user._id,
            },
            null,
            {
                limit,
                skip,
                sort:sort
            })
            
            res.send(task1)
        }
        
    }
    catch(e)
    {
        res.status(500).send()
    }
   
   
    // Tasks.find({}).then((task)=>{
    //     res.send(task)
    // }).catch((e)=>{
    //     res.status(500).send("Error!")
    // })
})

//get method for particular task which match with id
router.get('/tasks/:id',auth,async (req,res)=>{
    const _id=req.params.id
    try{
        //const task=await Tasks.findById(_id)
        const task=await Tasks.findOne({_id,owner:req.user._id})
        if(!task)
        {
            return res.status(404).send()
        }
        res.send(task)  
    }
    catch(e)
    {
        res.status(404).send()
    }
   
   
   
    // Tasks.findById(_id).then((task)=>{
    //     if(!task)
    //     {
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })


   
})

//post method for users

//post method for tasks
router.post('/tasks',auth,async (req,res)=>{
    const tasks=new Tasks({
        ...req.body,
        owner:req.user._id
    })
    
    try
    {
        await tasks.save()
        res.send(tasks)
    }
    catch (e)
    {
        res.status(400).send()
    }
    
})

//for update resourse patch method use 


router.patch('/tasks/:id',auth,async (req,res)=>{
    const updates=Object.keys(req.body)
    const allowupdates=['description','completed']
    const isvalid=updates.every((update)=>{
        return allowupdates.includes(update) 
    })

    if(!isvalid)
    {
        res.status(400).send("Error:Invalid Upadate")
    }

    const _id=req.params.id
    try
    {
        const task=await Tasks.findOne({_id:_id,owner:req.user._id})

       
        //const user=await Tasks.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        if(!task)
        {
            return res.status(404).send()
        }

        updates.forEach((update)=>{
            task[update]=req.body[update]
        })
        await task.save()
        res.send(task)

    }
    catch (e)
    {
        res.status(400).send(e)
    }
})

//for delete we use delete method


router.delete('/tasks/:id',auth,async (req,res)=>{
    const _id=req.params.id

    try
    {
        const tasks=await Tasks.findOneAndDelete({_id:_id,owner:req.user._id})
        //const tasks=await Tasks.findByIdAndDelete(_id)
        if(!tasks)
        {
            return res.status(404).send()
        }
        res.send(tasks)
    }
    catch (e)
    {
        res.status(500).send()
    }  

})
module.exports=router