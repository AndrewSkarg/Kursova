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

router.get('/', validateToken, async (req, res) => {
    const dishes = await db['Dish'].findAll({
        // include: [db['Component']],
    });
    //console.log(dishes)
    const arr = []
    dishes.forEach(element => {
        const { Components, ...rest } = element.dataValues;
        arr.push(rest);
        //  element.dataValues.Components.forEach( el=>{
        //      console.log(el.dataValues);
        // })
    });

    console.log(arr);
    res.status(200).json(arr);




})
router.get('/:dish_id', validateToken, async (req, res) => {
    const dish = await db['Dish'].findOne({
        where: { dish_id: req.params.dish_id },
        include: [db['Component']],
    });
    if (dish) {
        const components = await dish.getComponents(); // Update the associated components
        console.log('Components of dish ', dish.dish_id, ' ', dish.title, ' ', JSON.stringify(components, null, 2));
        const responseData = {
            dishTitle: dish.title,
            components_: components
        };
        res.json(responseData);
    } else {
        console.log('No components in dish')
        res.json({ error: 'No components in dish' });
    }
});


router.get('/day/:name', validateToken, async (req, res) => {
    const posts = await loadDishes(req.params.name);
    const j = JSON.stringify(posts, null, 2);
    console.log('All dishes:', j);
    res.send(j);
});

//Add Post
router.post('/', validateToken, async (req, res) => {
    //const posts = await loadDishes();
    console.log('creating', req.body.title, ' ', req.body.kind)

    try {
        const dish = await db['Dish'].findOne({
            where: {
                title: req.body.title
            }
        });

        if (dish) {
            res.status(200).json({ dish });
        } else {

            const dish = await db['Dish'].create({
                title: req.body.title,
                kind: req.body.kind,
            });
            res.status(201).json({ dish });

        }


    } catch (err) {
        const msg = 'невірно введені дані';
        console.log(msg);
        return res.status(409).json({ error: msg });
    }
});

//Delete Post
router.delete('/:dish_id', validateToken, async (req, res) => {
    //const posts = await loadDishes();
    const result = await db['Dish'].destroy({
        where: { dish_id: req.params.dish_id }
    });
    const show=await db['Portion'].findOne({where:{firstDishF:req.params.dish_id }});
    console.dir(show);
    if (result == 1)
        res.status(200).json({ msg: 'Deleted dish' });
    else
        res.status(200).json({ error: 'Not existing dish' });

});


router.put('/:dish_id', validateToken, async (req, res) => {
    await db['Dish'].update(
        { title: req.body.title },
        { where: { dish_id: req.params.dish_id } }
    );
    const selectedComponents = req.body.selectedComponents;
    const dish_id = req.params.dish_id;

    const createdDishComponents = [];

    await Promise.all(selectedComponents.map((dishCompData) => {

        return db['DishComponent'].findOne({
            where: { dishF: dish_id, componentF: dishCompData.componentF },
        }).then(async (existingDishComp) => {
        if (existingDishComp) {
            // Якщо запис знайдений, оновлюємо його поля з dishCompData
            await existingDishComp.update(dishCompData);
        } else {
            // Якщо запис не знайдений, створюємо новий запис з dishCompData
            await db['DishComponent'].create(dishCompData);
        }}).catch((error) => {
        console.error("Помилка при створенні/оновленні DishComponents:", error);
        res.json({ error: 'Error creating/updating DishComponents' });
    });


    })).then(async () => {
        
        const allDishComponents = await db['DishComponent'].findAll({ where: { dishF: dish_id } });

        const selectedComponentF = selectedComponents.map((dishCompData) => dishCompData.componentF);
        const componentsToDelete = allDishComponents.filter((dishComp) => !selectedComponentF.includes(dishComp.componentF));
        await Promise.all(componentsToDelete.map((dishComp) => {
            console.log('will del: ', dishComp.dataValues.componentF);
            return db['DishComponent'].destroy({ where: { componentF: dishComp.dataValues.componentF } });
        }));

        res.json({ msg: 'DishComponents created:' + createdDishComponents });
        console.log('okey');

    })



});


async function loadDishes(nameDay) {
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

