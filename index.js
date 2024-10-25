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
    let query = `SELECT *,
    				article.name as article_name,
					author.name as author_name
					FROM article
					INNER JOIN author
					ON author.id = article.author_id WHERE slug="${req.params.slug}"`
                    let article
                    con.query(query, (err, result) => {
                        if (err) throw err;
                        article = result
                        res.render('article', {
                            article: article
                })
        });
})


// show author article list        
app.get('/author/:author_id', (req, res) => {
    let query = `SELECT * FROM article WHERE author_id="${req.params.author_id}"`
    let articles
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        query = `SELECT * FROM author WHERE id="${req.params.author_id}"`
        let author
        con.query(query, (err, result) => {
            if (err) throw err;
            author = result
            res.render('author', {
                author: author,
                articles: articles
            })
        })
    })
})

app.listen(3003, () => {
    console.log('App is started at http://localhost:3003')
})   