/*
     _____ _           _       
   /  __ \ |         | |      
  | /  \/ |__   __ _| |_ ___ 
 | |   | '_ \ / _` | __/ __|
 | \__/\ | | | (_| | |_\__ \
 \____/_| |_|\__,_|\__|___/
 
 */

const express = require("express");
const chatController = require("../../controller/chatController");
const { userAuth } = require("../../middleware/userAuth");
const app = express();
const router = express.Router();

router.get("/fetchChat", userAuth.isLoggedIn, chatController.fetchChats);
module.exports = router;
