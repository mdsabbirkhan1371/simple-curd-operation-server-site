// require first 
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');

const app =express()
const port = process.env.PORT ||5000;

// mdsabbirkhan1972 TZWHuLos6Qo9wubU
// middleware 
app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://mdsabbirkhan1972:TZWHuLos6Qo9wubU@simple-crud-operation.xl90tqg.mongodb.net/?retryWrites=true&w=majority&appName=simple-crud-operation";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    // from data base mongodb
    const database = client.db("UsersDb");
    const usersCollection = database.collection("users");

    // delete one user from database 

    app.delete('/users/:id',async(req,res)=>{
        const id =req.params.id;
        console.log('delete from database',id)

        const query={_id: new ObjectId(id)}
        const result = await usersCollection.deleteOne(query)
        res.send(result)
    })


    // get all users by get method 
    app.get('/users',async(req,res)=>{
        const cursor = usersCollection.find()
        const result =await cursor.toArray()
        res.send(result)
    })


    // post method for add user 

    app.post('/users',async(req,res)=>{
        const user =req.body;
        console.log('new user',user)
        const result = await usersCollection.insertOne(user)
        res.send(result)
    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('CRUD OPERATION SETTING DATA RUNNING')
})

app.listen(port,()=>{
    console.log(`Simple Crud Operation is Running in Port : ${port}`)
})