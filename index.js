const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ivv8ial.mongodb.net/?retryWrites=true&w=majority`;

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
    const productCollection = client.db("TechBookDB").collection("products");
    const menuCollection = client.db("TechBookDB").collection("menu");
    const reviewCollection = client.db("TechBookDB").collection("reviews");
    const cartCollection = client.db("TechBookDB").collection("carts");
    const paymentCollection = client.db("TechBookDB").collection("payments");


    // ---------products-----------------
    // app.get("/products", async (req, res) => {
    //   try {
    //     const result = await productCollection.find({ status: 'accepted' }).sort({ timestamp: -1 }).toArray();
    //     res.send(result);
    //   } catch (error) {
    //     console.error("Error fetching products:", error);
    //     res.status(500).send("Internal Server Error");
    //   }
    // });
    app.get('/products', async (req, res) => {
      try {
        const { search, page } = req.query;
        const pageSize = 20;
        const skip = (page - 1) * pageSize;
  
        // Build the query based on search term
        const query = search ? { status: 'accepted', tags: { $in: [search] } } : { status: 'accepted' };
  
        // Fetch products with pagination
        const products = await productCollection
          .find(query)
          .sort({ timestamp: -1 })
          .skip(skip)
          .limit(pageSize)
          .toArray();
  
        res.json(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    app.get("/trending-products", async (req, res) => {
      try {
        // Fetch products that are accepted and featured
        const featuredProducts = await productCollection
          .find({ status: 'accepted', featured: true })
          .toArray();
    
        // Sort products based on the number of votes in descending order
        const trendingProducts = featuredProducts.sort((a, b) => b.upvoteCount - a.upvoteCount);
    
        res.send(trendingProducts);
      } catch (error) {
        console.error("Error fetching trending products:", error);
        res.status(500).send("Internal Server Error");
      }
    });
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
    res.send('running!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })