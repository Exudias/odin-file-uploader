const { Router } = require("express");
const indexController = require("../controllers/indexController");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const indexRouter = Router();
  
indexRouter.get("/", indexController.indexGet);
indexRouter.get("/login", indexController.loginGet);
indexRouter.get("/register", indexController.registerGet);
indexRouter.get("/logout", indexController.logoutGet);
indexRouter.post("/login", indexController.loginPost);
indexRouter.post("/register", indexController.registerPost);
indexRouter.post("/upload", upload.single("upload"), indexController.uploadPost);

module.exports = indexRouter;