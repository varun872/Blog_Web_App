import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let blogPosts = {};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/create", (req, res) => {
    res.render("create.ejs", { blogPosts: blogPosts });
});

app.get("/view", (req, res) => {
    res.render("view.ejs", { blogPosts: blogPosts });
});

app.get("/delete/:title", (req, res) => {
    const title = req.params.title;
    delete blogPosts[title];
    res.redirect("/create");
});

app.post("/create", (req, res) => {
    const { title, content } = req.body;
    if (blogPosts[title]) {
        res.send("Post with this title already exists.");
    }
    else {
        blogPosts[title] = content;
    }
    res.redirect("/view");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});