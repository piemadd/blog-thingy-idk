//realized that instead of having a "static" folder and having my build script copy stuff over, i can just have ejs file(s) for scripts and styles
const express = require('express');

const app = express();

app.use('/', express.static('dist'));

app.listen(3000, () => {
    console.log('server started');
});