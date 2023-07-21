const express = require('express');
const { dirname } = require('path');
const { validateToken } = require('../../JWT');
const appDir = dirname(require.main.filename); //get current execut file
const db = require(appDir + '/models');
const {
  Op
} = db.Sequelize;

const router = express.Router();

router.get('/:day/:time', validateToken, async (req, res) => {
    console.log(req.params.day);
    console.log(req.params.time);
    const portion = await db['Portion'].findOne({where:{ dayF:req.params.day, order:req.params.time}});;
    const j = JSON.stringify(portion, null, 2);
    console.log('Portion that corresponds query:',j);
    res.send(j);
})

router.put('/:portionId',validateToken, async (req, res) => {
    console.log(req.params.portionId);
    console.log(req.body.drinkId);
    const portion= await db['Portion'].update(
      { portionDrinkF: req.body.drinkId }, // Specify the field and its updated value
      { where: { portion_id: req.params.portionId } } // Set the condition for the update
    );
    const j = JSON.stringify(portion, null, 2);
    console.log('Portion that was updated:',j);
    res.send(j);
})


router.post('/', validateToken, async (req, res) => {
  const portion = await db['Portion'].findOne({
    where: { order: req.body.order, dayF: req.body.dayF }
  });

  if (portion) {
    if (req.body.kind === 'перше' && portion.firstDishF === null) {
      portion.firstDishF = req.body.dishF;
    } else if (req.body.kind === 'друге' && portion.secondDishF === null) {
      portion.secondDishF = req.body.dishF;
    } else if (req.body.kind === 'десерт' && portion.dessertDishF === null) {
      portion.dessertDishF = req.body.dishF;
    } else if (req.body.kind === 'салат' && portion.saladDishF === null) {
      portion.saladDishF = req.body.dishF;
    } else if (req.body.kind === 'напій' && portion.portionDrinkF === null) {
      portion.portionDrinkF = req.body.dishF;
    }

    await portion.save();
  } else {
    await db['Portion'].create({
      order: req.body.order,
      dayF: req.body.dayF,
      firstDishF: req.body.kind === 'перше' ? req.body.dishF : null,
      secondDishF: req.body.kind === 'друге' ? req.body.dishF : null,
      dessertDishF: req.body.kind === 'десерт' ? req.body.dishF : null,
      saladDishF: req.body.kind === 'салат' ? req.body.dishF : null,
      portionDrinkF: req.body.kind === 'напій' ? req.body.dishF : null
    });
  }


  res.status(201).send();

})







module.exports = router;

