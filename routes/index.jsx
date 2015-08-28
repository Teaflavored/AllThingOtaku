var express = require('express');
var router = express.Router();
var React = require("react");
var app = require("../app/");
var async = require("async");
var lightNovelService = require("../service/light_novel");
//client routing requires
var ReactRouter = require("react-router");
var expressState = require("express-state");
var pluginInstance = app.getPlugin("FetchrPlugin");



module.exports = router;
