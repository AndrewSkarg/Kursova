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
router.get('/:dish_id',validateToken, async (req, res) => {
    console.log("cool")
    const dish = await db['Dish'].findOne({
        where: { dish_id: req.params.dish_id },
        include: [db['Component']],
    });
if (dish) {
        const components = await dish.getComponents(); // Update the associated components
        console.log('Components of dish ',dish.dish_id,' ',dish.title,' ',JSON.stringify(components,null,2));
        const responseData = {
            dishTitle: dish.title,
            components_: components
        };
        res.json(responseData);
    } else {
        console.log('omg')
        res.json({ error: 'No components in dish' });
    }
});


router.get('/day/:name',validateToken, async (req, res) => {
    const posts = await loadPostsCollection(req.params.name);
    const j = JSON.stringify(posts, null, 2);
    console.log('All dishes:', j);
    res.send(j);
});

//Add Post
router.post('/',validateToken, async (req, res) => {
    const posts = await loadPostsCollection();
    await db['Dish'].create({
        title: req.body.title,
        description: req.body.description,
        portionForeign: req.body.portionForeign
    });
    res.status(201).send();
});

//Delete Post
router.delete('/:dish_id',validateToken, async (req, res) => {
    const posts = await loadPostsCollection();
    const result = await db['Dish'].destroy({
        where: { dish_id: req.params.dish_id }
    });
    if (result == 1)
        res.status(200).json({ msg: 'Deleted dish' });
    else
        res.status(200).json({ error: 'Not existing dish' });

});
router.put('/:dish_id',validateToken, async (req, res) => {
    const dish = await db['Dish'].findOne({
        where: { dish_id: req.params.dish_id },
        include: [db['Component']],
    });

    if (dish) {
        dish.title = 'someTitle2';
        req.body.id
        // const components = dish.Components;
        // components.forEach((component) => {
        //     component.title = 'New Title';
        //     component.count = 10;
        //     component.priceForUnit = 9.99;
        //     component.unit = 'кг';
        //     component.description = 'крупи';

        //     component.save();
        // });
        // const generalComponents = await db['Component'].findAll();

        await dish.setComponents(generalComponents); // Update the associated components
        await dish.save();

        res.json({ msg: 'Dish changed' });

    } else {
        res.json({ error: 'Not existing dish' });
    }


});


async function loadPostsCollection(nameDay) {
    let numDay = 1;
    let portionData = {};

    switch (nameDay) {
        case "mon":
            numDay = 1;
            break;
        case "tue":
            numDay = 2;
            break;
        case "wed":
            numDay = 3;
            break;
        case "thur":
            numDay = 4;
            break;
        case "fri":
            numDay = 5;
            break;
        case "sat":
            numDay = 6;
            break;
        case "sun":
            numDay = 7;
            break;
    }

    try {
        const portions = await db['Portion'].findAll({
            attributes: ['portion_id', 'dayF', 'order', 'firstDishF', 'secondDishF', 'dessertDishF', 'saladDishF', 'portionDrinkF'],
            where: {
                dayF: numDay
            }
        });

        for (const portion of portions) {
            const order = portion.order;

            if (!portionData[order]) {
                portionData[order] = {};
            }

            const dishData = {};

            // Retrieve the title and kind for each foreign key field
            if (portion.firstDishF) {
                const firstDish = await db['Dish'].findOne({
                    attributes: ['dish_id', 'title', 'kind'],
                    where: {
                        dish_id: portion.firstDishF
                    }
                });
                dishData.firstDishF = {
                    dish_id: firstDish.dish_id,
                    title: firstDish.title,
                    kind: firstDish.kind
                };
            }

            if (portion.secondDishF) {
                const secondDish = await db['Dish'].findOne({
                    attributes: ['dish_id', 'title', 'kind'],
                    where: {
                        dish_id: portion.secondDishF
                    }
                });
                dishData.secondDishF = {
                    dish_id: secondDish.dish_id,
                    title: secondDish.title,
                    kind: secondDish.kind
                };
            }

            if (portion.dessertDishF) {
                const dessertDish = await db['Dish'].findOne({
                    attributes: ['dish_id', 'title', 'kind'],
                    where: {
                        dish_id: portion.dessertDishF
                    }
                });
                dishData.dessertDishF = {
                    dish_id: dessertDish.dish_id,
                    title: dessertDish.title,
                    kind: dessertDish.kind
                };
            }

            if (portion.saladDishF) {
                const saladDish = await db['Dish'].findOne({
                    attributes: ['dish_id', 'title', 'kind'],
                    where: {
                        dish_id: portion.saladDishF
                    }
                });
                dishData.saladDishF = {
                    dish_id: saladDish.dish_id,
                    title: saladDish.title,
                    kind: saladDish.kind
                };
            }

            if (portion.portionDrinkF) {
                const portionDrink = await db['Component'].findOne({
                    attributes: ['component_id', 'title', 'unit', 'description'],
                    where: {
                        component_id: portion.portionDrinkF
                    }
                });
                dishData.portionDrinkF = {
                    dish_id: portionDrink.component_id,
                    title: portionDrink.title,
                    kind: portionDrink.description,
                    unit: portionDrink.unit
                };
            }

            portionData[order] = dishData;
        }

        console.log(portionData);
        return portionData;
    } catch (error) {
        console.log(error);
    }

    return portionData;
}

module.exports = router;

//Будь ласка, спробуйте використати оновлений код і перевірте, чи ви все ще отримуєте помилку.