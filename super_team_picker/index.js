//Express
const express = require('express');
const app = express();

//Setup Middleware
//Morgan
const logger = require('morgan');
app.use(logger('dev'));

//Body-parser
app.use(express.urlencoded({ extended: true }));

//Static public folder
const path = require('path');
app.use(express.static(path.join(__dirname, "public")));

//Method Override
const methodOverride = require('method-override');
app.use(methodOverride((req, res) => {
    if (req.body && req.body._method) {
        const method = req.body._method;
        return method;
    }
}))

//HomePage
app.get('/', (req, res) => {
    res.render('homePage');
})

//Router
const cohortRouter = require('./routes/cohorts');
app.use('/cohorts', cohortRouter);


//Setup View engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//Setup Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}...`);
})