const express = require('express');
const { dirname } = require('path');
const { validateToken } = require('../../JWT');
const appDir = dirname(require.main.filename); //get current execut file
const db = require(appDir + '/models');
const {
    Op
} = db.Sequelize;

const router = express.Router();

//VALIDATE TOKEN TO functions only for aut-cated
//Get POSTS

router.post('/',validateToken,async(req,res)=>{
    //const posts = await loadPostsCollection();order,dayF,firstDishF,secondDishF,dessertDishF,saladDishF,portionDrinkF
   const [portion, created] = await db['Portion'].findOrCreate({
  where: { order: req.body.order, dayF: req.body.dayF },
  defaults: {
    firstDishF: req.body.firstDishF,
    secondDishF: req.body.secondDishF,
    dessertDishF: req.body.dessertDishF,
    saladDishF: req.body.saladDishF,
    portionDrinkF: req.body.portionDrinkF
  }
});

if (!created) {
  // Запис уже існує, оновлюємо поля зі значеннями, якщо вони NULL
  if (portion.firstDishF === null && req.body.kind==='перше') {
    portion.firstDishF = req.body.dishF;
  }
  if (portion.secondDishF === null && req.body.kind==='друге') {
    portion.secondDishF = req.body.dishF;
  }
  if (portion.dessertDishF === null && req.body.kind==='десерт') {
    portion.dessertDishF = req.body.dishF;
  }
  if (portion.saladDishF === null && req.body.kind==='салат') {
    portion.saladDishF = req.body.dishF;
  }
  if (portion.portionDrinkF === null && req.body.kind==='напій') {
    portion.portionDrinkF = req.body.dishF;
  }

  await portion.save();
}

// portion - створений запис або знайдений існуючий запис з оновленими полями

    res.status(201).send();

})

// router.get('/', validateToken, async (req, res) => {
//     const components = await loadComponents();
//     const j = JSON.stringify(components, null, 2);
//     //console.log('All components:', j);
//     res.send(j);
// })

// router.get('/:component_id', validateToken, async (req, res) => {
//     const component = await db['Component'].findOne({
//         where: { component_id: req.params.component_id }
//     });

//     res.send(JSON.stringify(component, null, 2));
// });




// async function loadComponents(includeDishes) {
//     let components;

//     if (includeDishes) {
//         components = await db['Component'].findAll({
//             include: [
//                 {
//                     model: db['Dish'],
//                 },
//             ],
//         });
//     } else {
//         components = await db['Component'].findAll({
//         });
//     }

//     return components;
// }






module.exports = router;

//Будь ласка, спробуйте використати оновлений код і перевірте, чи ви все ще отримуєте помилку.