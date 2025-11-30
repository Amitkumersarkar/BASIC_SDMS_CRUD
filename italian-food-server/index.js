require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASS}@cluster0.teinl8i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

        //Declared all databases and collections
        const foodCollection = client.db('cravrrDB').collection('foods');
        const paymentCollection = client.db('PaymentDB').collection('payments');
        const reservationCollections = client.db('ReservationDB').collection('reservations');
        // const orderCollection = client.db('orderDB').collection('orders');
        // const userCollection = client.db('userDB').collection('users');

        // http method for foods collection
        app.post('/foods', async (req, res) => {
            const newFood = req.body;
            const result = await foodCollection.insertOne(newFood);
            res.send(result);
        })

        app.get('/foods', async (req, res) => {
            const query = foodCollection.find();
            const result = await query.toArray();
            res.send(result);
        })

        // http method for payments collection
        app.post('/payments', async (req, res) => {
            const newPayment = req.body;
            const result = await paymentCollection.insertOne(newPayment);
            res.send(result);
        })

        // app.get('/payments', async (req, res) => {
        //     const query = paymentCollection.find();
        //     const result = await query.toArray();
        //     res.send(result);
        // })

        // http method for Reservation collection
        app.post('/reservations', async (req, res) => {
            const newReservation = req.body;
            const result = await reservationCollections.insertOne(newReservation);
            res.send(result);
        })




        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

    } catch (error) {
        console.log(error);
    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('The Italian Food Server Is Running');
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
