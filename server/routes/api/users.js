const express = require('express');
const { dirname } = require('path');
const appDir = dirname(require.main.filename); //get current execut file
const db = require(appDir + '/models');
const {
    Op
} = db.Sequelize;


const router = express.Router();
// console.log();
//Get POSTS 
// router.get('/registration', async(req, res) => {
//     const posts = await loadPostsCollection();

//     const j = JSON.stringify(posts, null, 2);
//     console.log('All dishes:', j);

//     res.send(j);
// })

//Add Post
router.post('/registration', async(req, res) => {
    const posts = await loadPostsCollection();
    await db['User'].create({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName:req.body.lastName
    });
    res.status(201).send();
})


//Delete Post
router.delete('/:dish_id', async(req, res) => {
    
    const posts = await loadPostsCollection();
    await db['Dish'].destroy({
        where: { dish_id: req.params.dish_id }
    })
    res.send(200).send();

});


async function loadPostsCollection() {
    return await db['Dish'].findAll({attributes: ['dish_id', 'title', 'description']});
       
            // where: {
            //     [Op.or]: [{
            //             dish_id: 1,
            //             dish_id: 2
            //         }

        //     ]

        // }

}


//USE CURL