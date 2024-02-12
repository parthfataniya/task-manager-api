require('../src/db/mongoose.js')
const Tasks=require('../src/models/tasks.js')


// Tasks.findByIdAndDelete('65bf7e274cddd9c18b460bcf').then((task)=>{
//     console.log(task)
//     return Tasks.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeAndCount=async(id,completed)=>{
    const user=await Tasks.findByIdAndUpdate(id,{completed})
    const count=await Tasks.countDocuments({completed})
    return count
}

updateAgeAndCount('65c08395278575a33c317f0a',true).then((res)=>{
    console.log(res)
}).catch((e)=>{
    console.log(e)
})