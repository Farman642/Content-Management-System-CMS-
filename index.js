const express = require("express");
const { engine } =require('express-handlebars');
require("dotenv").config();
const connectDB = require("./confirg/Databaseconnect"); // Corrected path
const path = require("path");
const defaultRoutes = require("./routes/defaultRoutes");
const adminRoutes = require("./routes/adminRoutes");
const flash = require("connect-flash");
const session = require("express-session");
const {gloabVariable} =require("./middleware/config")
const bodyParser = require('body-parser');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));
app.use('/', express.static('public/admin'));

//Flash & Session

app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true
}))

app.use(flash());

app.use(gloabVariable)
app.use(bodyParser.urlencoded({ extended: true }));

// Setup view engine
app.engine('handlebars',engine({defaultLayout: 'default'}));
app.set('view engine' , 'handlebars');


const port = process.env.PORT || 3000;

connectDB();

app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
