//realized that instead of having a "static" folder and having my build script copy stuff over, i can just have ejs file(s) for scripts and styles

const express = require('express');
const path = require("path");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
});

app.get("/posts/:path", (req, res) => {
    let filePath = req.params.path

    if (!filePath.endsWith('.html')) {
        filePath += '.html'
    }
    
    res.sendFile(path.join(__dirname, "dist", "posts", filePath));
});

app.listen(3000, () => {
    console.log('server started');
});
