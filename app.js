const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const path = require('path')
const albums = require('./data/albums.json')
const totalPages = Math.floor(albums.length / 10)
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/albums/:page', (req, res) => {
  let page = req.params.page
  res.render('index', {
    albums: albums.slice((page * 10) - 10, page * 10),
    next: page <= totalPages ? `/albums/${+page + 1}` : null,
    previous: page == 1 ? null : `/albums/${+page - 1}`
  })
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})