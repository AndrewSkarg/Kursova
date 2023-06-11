const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const app = express();
//Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);


const port = process.env.PORT || 5000
db.sequelize.authenticate()
    .then(
        function () {
            app.listen(port, () => { console.log('server listening port ' + port); }
            )
        }
    ).catch(function (error) {
        //console.log('%c----------------CHECK DATABASE CONNECTION-------------'+'\n'+error.message, 'color: red');
        throw new Error('----------------CHECK DATABASE CONNECTION-------------'+'\n'+error.message);
    });

