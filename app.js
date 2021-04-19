const express = require('express')
app = express()
const cors = require('cors');
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const allowedOrigins = [
    'http://localhost:3000',
 ];
app.use(cors({
    origin(origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// const user = require('./routes/auth')
// app.use('/api/account', user)

// home route
app.use('/', (req, res) => {
    res.status(200).json({
        message: "Comride account working"
    })
})

//db sequelize
// const db = require('./models/index')
// db.sequelize.sync({force:true});

// Server
const port = process.env.PORT || 3033;
app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});

module.exports = app;