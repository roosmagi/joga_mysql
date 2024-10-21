//application packages
const express =require('express')
const app = express()

const path = require('path')
// add template engine
const hbs = require('express-handlebars')
// setup template engine directory and files extensions
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname+ '/views/layouts/',
}))
// setup static public directory
app.use(express.static('public'))

const mysql = require('mysql2')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

// create database connection
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Qwerty',
    database: 'joga_mysql'
})

con.connect((err) => { 
    if(err) throw err;
    console.log('Connected to joga_mysql db')
})

//show all articles - index page
app.get('/', (req, res) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('index', {
            articles: articles
        } )
    }) 
})

// show article by this slug
app.get('/article/:slug', (req, res) => {
    let query = `
      SELECT article.*, author.name AS author_name 
      FROM article 
      JOIN author ON article.author_id = author.id 
      WHERE article.slug = "${req.params.slug}"
    `;
    con.query(query, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            article = result[0];
            res.render('article', {
                article: article, 
            });
        }
    });
});


app.listen(3003, () => {
    console.log('App is started at http://localhost:3003')
})   