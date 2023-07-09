const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const app = express();
//Middleware
app.use(bodyParser.json());
app.use(cors());

//recent
const cookieParser = require("cookie-parser");
app.use(cookieParser());


const dishes = require('./routes/api/dishes');
const users=require('./routes/api/users');
const components = require('./routes/api/components');

// app.use('/api/posts', posts);
app.use('/api/dishes', dishes);
app.use('/api/users',users);
app.use('/api/components',components);


const port = process.env.PORT || 5000
db.sequelize.sync({ force: false })
    .then(
        function () {
            dishKindEqTypeTriger(db.sequelize);
            subTotalCountOfComp(db.sequelize);
            
            app.listen(port, () => { console.log('server listening port ' + port); }
            )
        }
    ).catch(function (error) {
        //console.log('%c----------------CHECK DATABASE CONNECTION-------------'+'\n'+error.message, 'color: red');
        throw new Error('----------------CHECK DATABASE CONNECTION-------------' + '\n' + error.message);
    });











async function dishKindEqTypeTriger(sequelize) {
    sequelize.query(`
  CREATE TRIGGER check_foreign_key_insert
  BEFORE INSERT ON portions
  FOR EACH ROW
  BEGIN
      DECLARE dish_kind VARCHAR(255);
      IF NEW.firstDishF IS NOT NULL THEN
          SELECT kind INTO dish_kind FROM dishes WHERE dish_id = NEW.firstDishF;
          IF dish_kind <> 'перше' THEN
              SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid foreign key for firstDishF';
          END IF;
      END IF;

      IF NEW.secondDishF IS NOT NULL THEN
          SELECT kind INTO dish_kind FROM dishes WHERE dish_id = NEW.secondDishF;
          IF dish_kind <> 'друге' THEN
              SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid foreign key for secondDishF';
          END IF;
      END IF;

    IF NEW.saladDishF IS NOT NULL THEN
          SELECT kind INTO dish_kind FROM dishes WHERE dish_id = NEW.saladDishF;
          IF dish_kind <> 'салат' THEN
              SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid foreign key for saladDishF';
          END IF;
      END IF;

    IF NEW.dessertDishF IS NOT NULL THEN
          SELECT kind INTO dish_kind FROM dishes WHERE dish_id = NEW.dessertDishF;
          IF dish_kind <> 'десерт' THEN
              SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid foreign key for dessertDishF';
          END IF;
      END IF;
    
    IF NEW.portionDrinkF IS NOT NULL THEN
          SELECT description INTO dish_kind FROM components WHERE component_id = NEW.portionDrinkF;
          IF dish_kind <> 'напої' THEN
              SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid foreign key for portionDrinkF';
          END IF;
      END IF;

  END;
`).then(() => {
        console.log('Trigger  dishKindEqTypeTriger  created successfully');
    }).catch(err => {
        console.error('Trigger dishKindEqTypeTriger is already created ');
    }).finally(() => {
    });

}



async function subTotalCountOfComp(sequelize) {
    sequelize.query(`
  CREATE TRIGGER update_component_count
AFTER INSERT ON DishComponents
FOR EACH ROW
BEGIN
    DECLARE compCount DECIMAL(7, 3);
    SET compCount = NEW.countOfComp;

    UPDATE Components
    SET count = count - compCount
    WHERE component_id = NEW.componentF;
END;

`).then(() => {
        console.log('Trigger  subTotalCountOfComp  created successfully');
    }).catch(err => {
        console.error('Trigger subTotalCountOfComp is already created ');
    }).finally(() => {
    });

}

