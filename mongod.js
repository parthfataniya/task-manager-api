//CRUD  create read update delete
const mongodb=require('mongodb')

 const MongodbClient=mongodb.MongoClient

 const connectionURL='mongodb://127.0.0.1:27017'
 const databaseName='Task-manager'
 const client=new MongodbClient(connectionURL)
 const db = client.db(databaseName);
 const collection = db.collection('users')

//create object id
// const ObjectId=mongodb.ObjectId   
// const id =new ObjectId()
// console.log(id,id.getTimestamp())

 async function connect(){
 try{
 await MongodbClient.connect(connectionURL)
 console.log('connection success')
 const db=client.db(databaseName)
 //const findResult = await db.collection('users').deleteMany({name:"man"});

 //insert value to users collection
//  db.collection('users').insertMany([{
//     name:"parth",
//     age:18234
//  },{
//     name:"manish",
//     age:12
//  },
//  {
//     name:"man",
//     age:23
//  }


// ]).then((result,error)=>{
//     if(error)
//     {
//         return console.log('unable to insert data')
//     }
//     console.log(result.insertedIds)
   
//    console.log('Found documents =>', findResult);
//  })

//  db.collection('tasks').insertMany([{
//     description:"user added",
//     completed:true
//  },
//  {
//     description:"user not added",
//     completed:false
//  }
// ]).then((result,error)=>{
//     if(error)
//     {
//         return console.log('unable to add')
//     }
//     console.log(result.insertedIds)
// })








}catch(error)
{
    console.log(error)
}}
connect();
