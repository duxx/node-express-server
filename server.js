const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

let app = express();

app.use((req, res, next) => {
    let now = new Date().toString()
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log("Unable to write to server.log")
        }
    })
    next()
})

/* app.use((req, res, next) => {
    res.render('maintenance.hbs')
}) */

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        currentYear: new Date().getFullYear()
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
    })
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})