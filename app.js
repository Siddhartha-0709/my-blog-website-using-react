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

app.get("/software-blogs", async (req, res) => {
  try {
    // Fetch data from MongoDB
    const blogData = await blog.find({ genre: "software-development" });
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
app.get("/lifestyle-blogs", async (req, res) => {
  try {
    // Fetch data from MongoDB
    const blogData = await blog.find({ genre: "lifestyle" });
    // Send the data as the response
    console.log(blogData);
    res.json(blogData);
  } catch (error) {
    console.error("Error retrieving blog posts:", error);
    res.status(500).send("Error retrieving blog posts");
  }
});
app.get("/discussion-forums", async(req, res)=>{
  res.send('Under Development');
})
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
