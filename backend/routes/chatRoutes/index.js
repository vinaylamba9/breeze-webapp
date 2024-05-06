/**

     _____ _           _       
   /  __ \ |         | |      
  | /  \/ |__   __ _| |_ ___ 
 | |   | '_ \ / _` | __/ __|
 | \__/\ | | | (_| | |_\__ \
 \____/_| |_|\__,_|\__|___/
 
 */

const express = require("express");
const app = express();
const router = express.Router();

const getRouter = require("./get");
const postRouter = require("./post");
const updateRouter = require("./update");
const deleteRouter = require("./delete");

router.use("/get", getRouter);
router.use("/post", postRouter);
router.use("/update", updateRouter);
module.exports = router;
