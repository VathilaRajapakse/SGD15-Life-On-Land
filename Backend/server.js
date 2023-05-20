const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const images = require("./middleware/imageBlog");
const projimages = require("./middleware/imagepro");
const productimages = require("./middleware/imageProducts");
const postimages = require("./middleware/imagePost");
const app = express();

//import routes
const postRoutes = require("./routes/blog");
const postRegister = require("./routes/register");
const postVo = require("./routes/volunteer");
const postProject = require("./routes/project");
const postProducts = require("./routes/Products");
const postsRoutes = require("./routes/posts");
const rating = require("./routes/rating")
//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(postRoutes);
app.use(postRegister);
app.use(postVo);
app.use(postProject);
app.use(postProducts);
app.use(postsRoutes);
app.use(rating);

const PORT = 8080;
const DB_URL =
  "mongodb+srv://it21066016:vathila143@helpnature.td9rjdp.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb connection success!");
});

app.use("/upload/blogPic/:nic", images.single("blogPic"), function (req, res) {
  res.json("Done");
});

app.use(
  "/upload/project/:nic",
  projimages.single("project"),
  function (req, res) {
    res.json("Done");
  }
);

app.use(
  "/upload/product/:nic",
  productimages.single("product"),
  function (req, res) {
    res.json("Done");
  }
);

app.use("/upload/post/:nic", postimages.single("post"), function (req, res) {
  res.json("Done");
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
