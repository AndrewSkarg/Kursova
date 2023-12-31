const express = require('express');
const { dirname } = require('path');
const appDir = dirname(require.main.filename); 
const db = require(appDir + '/models');
const { User } = require(appDir + '/models');
const bcrypt = require("bcrypt");

const { createTokens, validateToken } = require(appDir + '/JWT');
const {
    Op
} = db.Sequelize;

const router = express.Router();
router.get('/logout', async (req, res) => {
        res.cookie('access-token', '', { expires: new Date(0) });
        res.json({msg:'log out success'})
})

router.post('/register', async (req, res) => {
    try {
        res.cookie('access-token', '', { expires: new Date(0) });
        const { email, firstName, lastName, password, title, rank } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const isPresent = await User.findOne({
            where: { email: email }
        });

        if (isPresent) {
            res.status(409).json({ error: "User with this email is already registered!" });
        } else {
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
            await db['Position'].create({
                user: newUser.user_id,
                title: title,
                rank: rank
            });
            res.status(200).json({ msg: 'registered' })

        }
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
                res.status(200).json(user);
            }
        });
    } catch (err) {

        console.log('unvalid login data');
    }
});

router.get("/profile", validateToken, async (req, res) => {
    const profile = await getProfile(req.user);
    res.status(200).json(profile);
});



async function getProfile(user) {
    let userDb = {};



    try {
        userDb = await User.findOne({
            attributes: ['firstName', 'lastName', 'email', 'password'],
            where: {
                user_id: user.user_id
            },
            include: [
                {
                    model: db['Role'],
                    attributes: ['name']
                },
                {
                    model: db['Position'],
                    attributes: ['title', 'rank', 'user']
                }
            ]
        });

        
        return userDb;

    } catch (error) {
        console.log(error);
    }


    return userDb;
}

module.exports = router;

