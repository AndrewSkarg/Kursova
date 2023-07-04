const express = require('express');
const { dirname } = require('path');
const appDir = dirname(require.main.filename); //get current execut file
const db = require(appDir + '/models');
const { User } = require(appDir + '/models');
const bcrypt = require("bcrypt");

const { createTokens, validateToken } = require(appDir + '/JWT');
const {
    Op
} = db.Sequelize;


const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        const { email, firstName, lastName, password, title, rank } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            password: hash,
            email: email
        });

        await db['UserRole'].create({
            user: newUser.user_id,
            role: 1
        });
        //'title','rank','user'
        await db['Position'].create({
            user: newUser.user_id,
            title: title,
            rank: rank
        });


        res.json("USER REGISTERED");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } });

        if (!user)
            res.status(400).json({ error: "User Doesn't Exist" });

        const dbPassword = user.password;
        bcrypt.compare(password, dbPassword).then((match) => {
            if (!match) {
                res
                    .status(400)
                    .json({ error: "Wrong Username and Password Combination!" });
            } else {
                const accessToken = createTokens(user);

                res.cookie("access-token", accessToken, {
                    maxAge: 60 * 60 * 24 * 30 * 1000,
                    httpOnly: true,
                });
                res.json(user);
            }
        });
    } catch (err) {
        console.log('unvalid login data');
    }
});

router.get("/profile", validateToken, async (req, res) => {
    const profile = await getProfile(req.user);
    res.status(200).json(profile); //401 Unauthorized
});



async function getProfile(user) {
    let userDb = {};



    try {
        userDb = await User.findOne({
            attributes: ['firstName', 'lastName', 'email', 'password'],
            where: {
                user_id: user.user_id
            },
            include: {
                model: db['UserRole'],
                include: {
                    model: db['Role'],
                    attributes: ['name']
                }
            }

        });

        userDb.position = await db['Position'].findOne({
            attributes: ['title', 'rank', 'user'],
            where: {
                user: user.user_id //on db user change
            }
        });



        console.log(userDb);
        return userDb;

    } catch (error) {
        console.log(error);
    }


    return userDb;
}

module.exports = router;

