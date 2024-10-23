const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

function checkUserAgent(req, res, next) {
    const userAgent = req.get('User-Agent');
    if (userAgent && userAgent.includes('<script>alert("XSS")</script>')) {
        return res.render('flag', { flag: 'FLAG{XSS_SUCCESS}' });
    }
    next();
}

app.get('/', checkUserAgent, (req, res) => {
    const userAgent = req.get('User-Agent');
    res.render('index', { userAgent });
});

app.listen(PORT, () => {
    console.log(`server is listening => http://localhost:${PORT}`);
});