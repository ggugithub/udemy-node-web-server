const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use( (req, res, next) => {
    var now = new Date().toString();
    console.log(`${now}: ${req.method}, ${req.url}`);
    next();
});

/*app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        headerTitle: 'Maintenance',
        maintenanceMsg: 'The site is currently under maintenance and not available.'
    });
});*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        headerTitle: 'Home Page',
        welcomeText: 'Welcome to my website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        headerTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        text: 'Bad request',
        code: 400
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
