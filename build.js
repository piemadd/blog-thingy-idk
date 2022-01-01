const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const { marked } = require('marked');

const titleCase = ((str) => {
    str = str.toLowerCase().split(' ');
    
    for (let i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    
    return str.join(' ');
})

if (!fs.existsSync(path.join(__dirname, 'dist'))){
    fs.mkdirSync(path.join(__dirname, 'dist'));
}

if (!fs.existsSync(path.join(__dirname, 'dist', 'posts'))){
    fs.mkdirSync(path.join(__dirname, 'dist', 'posts'));
}

//i'm not using it, but here is the code you would use if you wanted to sanitize your markdown lol
/*
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const clean = DOMPurify.sanitize(dirty);
*/

const postsPath = path.join(__dirname, 'posts');

let posts = fs.readdirSync(postsPath)
let postsTitleCase = posts.map((post) => titleCase(post.split('.')[0]));
    
for (let i = 0; i < posts.length; i++) {
    fs.readFile(path.join(postsPath, posts[i]), 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        ejs.renderFile(path.join(__dirname, 'views', 'post.ejs'), { 'post': marked.parse(data), title: postsTitleCase[i] }, function(err, str) {
            if (err) {
                console.error(err)
                return
            }

            let resultingPath = path.join(__dirname, 'dist', 'posts', posts[i].split('.')[0]) + '.html'

            console.log("rendered " + posts[i].split('.')[0])
            
            fs.writeFile(resultingPath, str, err => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        });
    })  
}

ejs.renderFile(path.join(__dirname, 'views', 'index.ejs'), { posts, postsTitleCase }, function(err, str) {
    if (err) {
        console.error(err)
        return
    }

    let resultingPath = path.join(__dirname, 'dist', 'index.html');

    console.log("rendered index")
    
    fs.writeFile(resultingPath, str, err => {
        if (err) {
            console.error(err)
            return
        }
    })
});
