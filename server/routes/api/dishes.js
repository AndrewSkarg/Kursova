const express = require('express');
const { dirname } = require('path');
const portion = require('../../models/portion');
const appDir = dirname(require.main.filename); //get current execut file
const db = require(appDir + '/models');
const {
    Op
} = db.Sequelize;


const router = express.Router();
// console.log();
//Get POSTS 
router.get('/day/:name', async (req, res) => {
    const posts = await loadPostsCollection(req.params.name);
    // if(posts instanceof Error){
    //     res.status(500).send('internal error')
    // }
    //res.send(200);
    const j = JSON.stringify(posts, null, 2);
    console.log('All dishes:', j);

    res.send(j);
})

//Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await db['Dish'].create({
        title: req.body.title,
        description: req.body.description,
        portionForeign: req.body.portionForeign
    });
    res.status(201).send();
})


//Delete Post
router.delete('/:dish_id', async (req, res) => {

    const posts = await loadPostsCollection();
    await db['Dish'].destroy({
        where: { dish_id: req.params.dish_id }
    })
    res.send(200).send();

});


async function loadPostsCollection(nameDay) {
    let numDay = 1;
    let dishes = [];
    let portion = [];
    switch (nameDay) {
        case "mon": {
            numDay = 1;
            break;
        }

        case "tue": {
            numDay = 2;
            break;
        }

        case "wed": {
            numDay = 3;
            break;
        }

        case "thur": {
            numDay = 4;
            break;
        }

        case "fri": {
            numDay = 5;
            break;
        }

        case "sat": {
            numDay = 6;
            break;
        }


        case "sun": {
            numDay = 7;
            break;
        }



    }

    try {
        portion = await db['Portion'].findOne({
            attributes: ['portion_id', 'dayNumForeign'],
            where: {
                dayNumForeign: numDay
            }
        }).then((portion) => {
             dishes = db['Dish'].findAll({
                attributes: ['dish_id', 'title', 'description', 'portionForeign'],
                where: {
                    portionForeign: portion.portion_id
                }
            });

           
        })

        return dishes;
        

    } catch (message) {

        console.log(message);
    }
    //204	No Content

    return dishes;
    

}

module.exports = router;

//USE CURL