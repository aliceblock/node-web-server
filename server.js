const path = require('path')
const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const PORT = process.env.PORT || 3000

const app = express()

const ROOT_PATH = __dirname
const PUBLIC_PATH = path.join(ROOT_PATH, 'public')

// Handlebars settings
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

// SetExpress render view engine
app.set('view engine', 'hbs');

// Set middleware
app.use((req, res, next) => {
  const now = new Date().toString()
  const log = `${now}: ${req.method} ${req.url}`

  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })
  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

// Set Static middleware
app.use(express.static(PUBLIC_PATH))

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`)
})