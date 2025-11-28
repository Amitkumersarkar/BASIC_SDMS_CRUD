const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 4500;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASS}@cluster0.nkwifvw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server.
        await client.connect();

        // database connection
        const studentCollection = client.db('StudentDB').collection('Students');


        // post apis
        app.post('/students', async (req, res) => {
            const newStudent = req.body;
            const result = await studentCollection.insertOne(newStudent);
            res.send(result);
        })

        // get/read apis ( read all )
        app.get('/students', async (req, res) => {
            const query = studentCollection.find();
            const result = await query.toArray();
            res.send(result);
        })


        // delete apis
        app.delete('/students/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await studentCollection.deleteOne(query)
            res.send(result)
        })

        //read/get apis  (view specific one data)
        app.get('/students/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await studentCollection.findOne(query)
            res.send(result)
        })

        // update apis (put/patch)

        app.put('/students/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const updatedStudent = req.body;
            const updatedDoc = {
                $set: updatedStudent

            }
            const result = await studentCollection.updateOne(query, updatedDoc)
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



app.get('/', (req, res) => {
    res.send('student server is running');
})

app.listen(port, () => {
    console.log(`the student management server is running on port : ${port}`);
})