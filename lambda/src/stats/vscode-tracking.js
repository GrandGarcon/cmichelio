// tracking the vscode programming using  wakatime  integration.
// first you will need to register your appplication to get the API_KEY
const axios = require('axios');
const get = require('loadash-get');
const URL = require('url');


const API_KEY = process.env.WAKATIME_API;
if (!API_KEY) throw new Error(`No wakatime API key provided`)


const BASE_URL = 'https://wakatime.com/api/v1/users/';
const USER = 'Dhruv';
const PROJECT = process.env.PROJECT_ID;





