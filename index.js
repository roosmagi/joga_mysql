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

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

con.connect((err) => { 
    if(err) throw err;
    console.log('Connected to joga_mysql db')
})

const articleRoutes = require('./routes/article'); // import article route

// to use article routes
app.use('/', articleRoutes);
app.use('/article', articleRoutes)

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

//export controller funtion
module.exports = {
    getAllArticles,
    getArticleBySlug
}; 

app.listen(3003, () => {
    console.log('App is started at http://localhost:3003')
})   