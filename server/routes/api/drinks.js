const express = require('express');
const { dirname } = require('path');
const { validateToken } = require('../../JWT');
const appDir = dirname(require.main.filename); //get current execut file
const db = require(appDir + '/models');
const {
    Op
} = db.Sequelize;

const router = express.Router();



// router.post('/',validateToken,async(req,res)=>{
//     await db['Component'].create({
//         title: req.body.title,
//         count:req.body.count,
//         priceForUnit:req.body.priceForUnit,
//         unit:req.body.unit,
//         description: req.body.description,
//     });
//     res.status(201).send();

// })


router.get('/:component_id', validateToken, async (req, res) => {
    const component = await db['Component'].findOne({
        where: { component_id: req.params.component_id }
    });

    res.send(JSON.stringify(component, null, 2));
});











module.exports = router;

