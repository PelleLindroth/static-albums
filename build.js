const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const albums = JSON.parse(fs.readFileSync('./data/albums.json', {
  encoding: 'utf-8'
}))
const outputDir = path.join('dist')
const templatePath = path.join('views', 'index.ejs')

const pages = []
let page = []
let pageObject = {}

let style = process.argv[2]

if (!style || style != 'list-style' && style != 'sleeve-style') {
  style = 'list-style'
}

let perPage = (style === 'list-style') ? 10 : 15

albums.forEach(((album, index) => {
  if (index % perPage === 0 && index != 0) {
    pageObject = {
      albums: page,
      filename: `${(index - perPage) + 1}-${index}.html`,
      template: `${(index - perPage) + 1}-${index}.ejs`
    }
    pages.push(pageObject)
    page = []
  } else if (index === albums.length - 1) {
    pageObject = {
      albums: page,
      filename: `${(index) - page.length + 1}-${index + 1}.html`,
      template: `${(index) - page.length + 1}-${index + 1}.ejs`
    }
    pages.push(pageObject)
  }
  page.push(album)
}))

for (let i = 0; i < pages.length; i++) {
  let page = pages[i]
  let data = {}
  if (i === 0) {
    data = {
      albums: page.albums,
      next: pages[i + 1].filename,
      previous: null
    }
  } else if (i === pages.length - 1) {
    data = {
      albums: page.albums,
      next: null,
      previous: pages[i - 1].filename,
    }
  } else {
    data = {
      albums: page.albums,
      previous: pages[i - 1].filename,
      next: pages[i + 1].filename
    }
  }

  data.style = style

  ejs.renderFile(templatePath, data, (err, str) => {
    if (err) {
      console.log(err)
    } else {
      const outputPath = path.join(outputDir, page.filename)
      fs.writeFileSync(outputPath, str)
    }
  })
}

// Generating a Static Web site
// Utgå från albums.csv/.json.

// Sätt upp ett litet projekt som kan generera en 
// statisk webbplats där man kan bläddra bland albumen. 
// Varje sida bör innehålla 10-20st album och ska vara i 
//en separat html-fil.

// Skapa minst två olika stylesheets på sidan och styr 
// vilket stylesheet som ska användas med hjälp av en 
// miljövariabel.


