const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();
  
indexRouter.get("/", indexController.indexGet);
indexRouter.get("/login", indexController.loginGet);
indexRouter.get("/register", indexController.registerGet);
indexRouter.get("/logout", indexController.logoutGet);
indexRouter.post("/login", indexController.loginPost);
indexRouter.post("/register", indexController.registerPost);

module.exports = indexRouter;