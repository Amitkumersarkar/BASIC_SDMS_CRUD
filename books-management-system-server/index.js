require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3500;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.BOOKS_DB}:${process.env.BOOKS_PASS}@cluster0.5akcy0w.mongodb.net/?appName=Cluster0`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        // database and db collections
        const booksCollection = client.db('BooksDB').collection('books');
        // post apis
        app.post('/books', async (req, res) => {
            const newBook = req.body;
            const result = await booksCollection.insertOne(newBook);
            res.send(result);
        })
        // get apis
        app.get('/books', async (req, res) => {
            const result = await booksCollection.find().toArray();
            res.send(result);
        });

        // get apis for view/read data
        app.get('/books/:id', async (req, res) => {
            const id = req.params.id;
            const book = await booksCollection.findOne({ _id: new ObjectId(id) });
            res.send(book);
        });

        // put apis (update)
        app.put('/books/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const updatedBook = req.body;
            const updatedDoc = {
                $set: updatedBook
            }
            const result = await booksCollection.updateOne(query, updatedDoc);
            res.send(result)
        })

        // delete apis
        app.delete('/books/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await booksCollection.deleteOne(query);
            res.send(result);
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('the books server is running');
})

app.listen(port, () => {
    console.log(`the server is running on port:${port}`)
})