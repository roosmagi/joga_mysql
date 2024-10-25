//import database connection
const con = require('../utils/db')

// show author article list        
const getAuthorArticles = (req, res) => {
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
};

// export controller functions
module.exports = {
    getAuthorArticles
}; 