// У вашому коді є декілька помилок, які слід виправити:

// 1. У функції `loadPostsCollection`, коли ви повертаєте значення змінної `portionData`, ви повинні повернути саме цю змінну, а не пустий масив `dishes`. Замість `return dishes;` напишіть `return portionData;`.

// 2. Ви можете вилучити оголошення змінних `dishes` та `portion`, оскільки вони не використовуються.

// 3. Ви можете вилучити імпорт `const portion = require('../../models/portion');`, оскільки не використовуєте цей модуль у коді.

// 4. У кінці блоку `.then( async (portions) => {`, після виводу даних `console.log(portionData);`, додайте рядок `return portionData;`, щоб повернути дані.

// Ось оновлений код:

// ```javascript
const express = require('express');
const { dirname } = require('path');
const appDir = dirname(require.main.filename); //get current execut file
const db = require(appDir + '/models');
const {
    Op
} = db.Sequelize;

const router = express.Router();

//Get POSTS
router.get('/day/:name', async (req, res) => {
    const posts = await loadPostsCollection(req.params.name);
    const j = JSON.stringify(posts, null, 2);
    console.log('All dishes:', j);
    res.send(j);
});

//Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await db['Dish'].create({
        title: req.body.title,
        description: req.body.description,
        portionForeign: req.body.portionForeign
    });
    res.status(201).send();
});

//Delete Post
router.delete('/:dish_id', async (req, res) => {
    const posts = await loadPostsCollection();
    await db['Dish'].destroy({
        where: { dish_id: req.params.dish_id }
    });
    res.status(200).send();
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
                    attributes: ['dish_id','title', 'kind'],
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
                    attributes: ['dish_id','title', 'kind'],
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
                    attributes: ['dish_id','title', 'kind'],
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
                    attributes: ['dish_id','title', 'kind'],
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
                    attributes: ['component_id','title', 'unit','description'],
                    where: {
                        component_id: portion.portionDrinkF
                    }
                });
                dishData.portionDrinkF = {
                    dish_id: portionDrink.component_id,
                    title: portionDrink.title,
                    kind: portionDrink.description,
                    unit:portionDrink.unit
                };
            }

            portionData[order]=dishData;
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