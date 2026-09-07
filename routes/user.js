const { Router } = require('express');

 const User = require('../models/user');

const router = Router();

router.get('/signin', (req, res) => {
    res.render('signin');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
       const token = await User.matchPasswordAndGenerateToken(email, password);
        console.log('User signed in:', token);  
        res.cookie("token", token).redirect('/');
    } catch (error) {
        console.error('Signin Error:', error.message);
        res.status(401).render('signin', { error: error.message });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { fullName, email, password } = req.body; 
        await User.create({ fullName, email, password });
        res.redirect('/');
    }
    catch (error) {
        console.error('Signup Error:', error.message);
        res.status(500).send(`Error occurred while signing up: ${error.message}`);
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/');
});

module.exports = router;