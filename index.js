const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const productCollection = client.db("TechBookDB").collection("products");
    const userCollection = client.db("TechBookDB").collection("users");
    const reportCollection = client.db("TechBookDB").collection("reports");
    const reviewCollection = client.db("TechBookDB").collection("reviews");
    const cartCollection = client.db("TechBookDB").collection("carts");
    const paymentCollection = client.db("TechBookDB").collection("payments");

    // -------------- MiddleWares -----------------------
    const verifyToken = (req, res, next) => {
      console.log(req.headers);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "forbidden" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
        if (err) {
          return res.status(401).send({ message: "forbidden" });
        }
        req.decoded = decoded;
        next();
      });
    };

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden" });
      }
      next();
    };

    // ----------------JWT token ------------------------
    app.post("/jwt", (req, res) => {
      const userInfo = req.body;
      const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    //  ----------------for users -------------------------

    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = {
        email: email,
      };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const isExist = await userCollection.findOne(query);
      if (isExist) {
        return res.send({ message: "user exists", insertedId: null });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.patch("/users/:id", async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          role: item.role,
        },
      };
      const result = await userCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // ---------products-----------------

    app.get("/products", async (req, res) => {
      const result = await productCollection.find().toArray();
      res.send(result);
    });
    app.get("/products/status", async (req, res) => {
      const result = await productCollection
        .find()
        .sort({ status: -1 })
        .toArray();
      res.send(result);
    });

    app.post("/products", async (req, res) => {
      const productItem = req.body;
      const result = await productCollection.insertOne(productItem);
      res.send(result);
    });

    app.patch("/products/:id", async (req, res) => {
      const items = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      let updatedDoc = {
        $set: {
          productName: items.name,
          image: items.image,
          description: items.description,
          tags: items.tags,
          externalLinks: items.externalLinks,
        },
      };
      if ("featured" in items) {
        updatedDoc = {
          $set: {
            featured: items.featured,
          },
        };
      }
      if ("status" in items) {
        updatedDoc = {
          $set: {
            status: items.status,
          },
        };
      }
      const result = await productCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/trending-products", async (req, res) => {
      const query = { status: "accepted", featured: true };
      const result = await productCollection
        .find(query)
        .sort({ upvoteCount: -1 })
        .toArray();
      res.send(result);
    });

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;

      const query = {
        _id: new ObjectId(id),
      };
      const result = await productCollection.findOne(query);
      res.send(result);
    });

    // ----------------Reports-----------------------
    app.get("/reports", async (req, res) => {
      const result = await reportCollection.find().toArray();
      res.send(result);
    });
    app.get("/reports/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        product_id: id,
      };
      const result = await reportCollection.findOne(query);
      res.send(result);
    });

    app.post("/reports", async (req, res) => {
      const reportItem = req.body;
      const { product_id, product_name, user_email } = reportItem;
      const existingReport = await reportCollection.findOne({ product_id });

      if (existingReport) {
        const result = await reportCollection.updateOne(
          { product_id },
          { $addToSet: { user_emails: user_email }, $inc: { reportCount: 1 } }
        );
        res.send(result);
      } else {
        const result = await reportCollection.insertOne({
          product_id,
          product_name,
          user_emails: [user_email],
          reportCount: 1,
        });
        res.send(result);
      }
    });

    app.delete("/reports/:id", async (req, res) => {
      const id = req.params.id;
      const response = {};
      const reportQuery = { product_id: id };
      const reportResult = await reportCollection.deleteOne(reportQuery);
      response.reportResult = reportResult;

      const productQuery = { _id: new ObjectId(id) };
      const productResult = await productCollection.deleteOne(productQuery);
      response.productResult = productResult;

      res.send(response);
    });
    // ------------------------------------------------------END------------------------------------------------------------------------------
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("running!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
