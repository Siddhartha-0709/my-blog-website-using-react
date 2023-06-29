const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
async function main() {
  await mongoose.connect(
    "mongodb+srv://siddhartha:sidd12345@blog-posts.ma7uzl1.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("Connected to MongoDB");
}
main();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
const blogSchema = new mongoose.Schema({
  heading: String,
  subheading: String,
  genre: String,
  content: String,
  image: String,
});
const blog = mongoose.model("blog", blogSchema, "blog-posts");

app.get("/rnative-blogs", async (req, res) => {
  try {
    // Fetch data from MongoDB
    const blogData = await blog.find({ genre: "react-native" });
    // Send the data as the response
    console.log(blogData);
    res.json(blogData);
  } catch (error) {
    console.error("Error retrieving blog posts:", error);
    res.status(500).send("Error retrieving blog posts");
  }
});
app.get("/travel-blogs", async (req, res) => {
  try {
    // Fetch data from MongoDB
    const blogData = await blog.find({ genre: "travel" });
    // Send the data as the response
    console.log(blogData);
    res.json(blogData);
  } catch (error) {
    console.error("Error retrieving blog posts:", error);
    res.status(500).send("Error retrieving blog posts");
  }
});
app.get("/tech-blogs", async (req, res) => {
  try {
    // Fetch data from MongoDB
    const blogData = await blog.find({ genre: "technical" });
    // Send the data as the response
    console.log("Entry");
    console.log(blogData);
    res.json(blogData);
  } catch (error) {
    console.error("Error retrieving blog posts:", error);
    res.status(500).send("Error retrieving blog posts");
  }
});
app.get("/programming-blogs", async (req, res) => {
  try {
    // Fetch data from MongoDB
    const blogData = await blog.find({ genre: "programming" });
    // Send the data as the response
    console.log(blogData);
    res.json(blogData);
  } catch (error) {
    console.error("Error retrieving blog posts:", error);
    res.status(500).send("Error retrieving blog posts");
  }
});
app.get("/admin",function(req,res){
  res.render('blog_upload');
})
app.post("/post_blog", function (req, res) {
  console.log("received");
  const heading = req.body.heading;
  const subheading = req.body.subheading;
  const content = req.body.content;
  const genre = req.body.genre;
  const image = req.body.image;
  const password = req.body.password;
  if (password === "$$123456$$") {
    const newBlogPost = new blog({
      heading: heading,
      subheading: subheading,
      content: content,
      genre: genre,
      image: image,
    });
    async function saveBlogPost() {
      await newBlogPost.save();
    }
    saveBlogPost();
    console.log(newBlogPost);
    res.send("SUCCESS");
  } else {
    res.send("INVALID PASSWORD / YOU ARE NOT AUTHORISED CONTACT ADMIN");
  }
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
