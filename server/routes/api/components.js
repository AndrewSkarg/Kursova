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
    //const posts = await loadPostsCollection();
    await db['Component'].create({
        title: req.body.title,
        count:req.body.count,
        priceForUnit:req.body.priceForUnit,
        unit:req.body.unit,
        description: req.body.description,
    });
    res.status(201).send();

})

router.get('/', validateToken, async (req, res) => {
    const components = await loadComponents();
    const j = JSON.stringify(components, null, 2);
    //console.log('All components:', j);
    res.send(j);
})

router.get('/:component_id', validateToken, async (req, res) => {
    const component = await db['Component'].findOne({
        where: { component_id: req.params.component_id }
    });

    res.send(JSON.stringify(component, null, 2));
});




async function loadComponents(includeDishes) {
    let components;

    if (includeDishes) {
        components = await db['Component'].findAll({
            include: [
                {
                    model: db['Dish'],
                },
            ],
        });
    } else {
        components = await db['Component'].findAll({
        });
    }

    return components;
}






module.exports = router;

//Будь ласка, спробуйте використати оновлений код і перевірте, чи ви все ще отримуєте помилку.