const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const {dishKindEqTypeTriger,subTotalCountOfComp}=require('./triggers');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const cookieParser = require("cookie-parser");
app.use(cookieParser());


const dishes = require('./routes/api/dishes');
const users = require('./routes/api/users');
const components = require('./routes/api/components');
const portions = require('./routes/api/portions');

app.use('/api/dishes', dishes);
app.use('/api/users', users);
app.use('/api/components', components);
app.use('/api/portions', portions);

const port = process.env.PORT || 5000
db.sequelize.sync({ force: false })
    .then(
        async function () {
            await dishKindEqTypeTriger(db.sequelize);
            await subTotalCountOfComp(db.sequelize);

            app.listen(port, () => { console.log('server listening port ' + port); }
            )
        }
    ).catch(function (error) {
        throw new Error('----------------CHECK DATABASE CONNECTION-------------' + '\n' + error.message);
    });



