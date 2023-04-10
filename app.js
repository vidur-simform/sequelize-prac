const log = console.log;
const express = require('express');
const sequelize = require('./utils/dbSequelize');
const User = require( './models/user');
const usr = new User();
JSON.stringify()
(async ()=>{
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
