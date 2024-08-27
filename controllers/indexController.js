const asyncHandler = require("express-async-handler");
const passport = require("passport");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

exports.indexGet = asyncHandler(async (req, res) => {
    const isLoggedIn = req.user;

    if (isLoggedIn) {
        res.render("index", { user: req.user });
    } else {
        res.redirect("/login");
    }
});

exports.loginGet = asyncHandler(async (req, res) => {
    const isLoggedIn = req.user;

    if (isLoggedIn) {
        res.redirect("/");
    } else {
        res.render("login");
    }
});

exports.registerGet = asyncHandler(async (req, res) => {
    const isLoggedIn = req.user;

    if (isLoggedIn) {
        res.redirect("/");
    } else {
        res.render("register");
    }
});

exports.logoutGet = asyncHandler(async (req, res) => {
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
    });
});

exports.loginPost = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
});

exports.registerPost = [
    body('username').isLength({ min: 1, max: 255 }).withMessage('Username must be between 1 and 255 characters long').trim().escape(),
    body('password').isLength({ min: 1, max: 255 }).withMessage('Password must be between 1 and 255 characters long').trim().escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("register", {
                user: req.user,
                errors: errors.array(),
            });
        }

        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = await db.getUserByUsername(req.body.username);
            if (user) {
                return res.status(400).render("register", {
                    user: req.user,
                    errors: [{msg: "Username already exists!"}],
                });
            } else {
                await db.createUser(req.body.username, hashedPassword);
                res.redirect("/");
            }
        } catch (err) {
            return next(err);
        }
    })
];