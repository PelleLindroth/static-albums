const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

// Generating a Static Web site
// Utgå från albums.csv/.json.

// Sätt upp ett litet projekt som kan generera en 
// statisk webbplats där man kan bläddra bland albumen. 
// Varje sida bör innehålla 10-20st album och ska vara i 
//en separat html-fil.

// Skapa minst två olika stylesheets på sidan och styr 
// vilket stylesheet som ska användas med hjälp av en 
// miljövariabel.