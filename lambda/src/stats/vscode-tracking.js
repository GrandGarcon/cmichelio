// tracking the vscode programming using  wakatime  integration.
// first you will need to register your appplication to get the API_KEY and user name settings 
// install the vscode extension 


const axios = require('axios');
const get = require('loadash-get');
const URL = require('url');
//const d3 = require('@d3/histogram')

const API_KEY = process.env.WAKATIME_API;
if (!API_KEY) throw new Error(`No wakatime API key provided`)

const PROJECT = process.env.PROJECT_ID;
const USER = process.env.USER;
const BASE_URL = 'https://wakatime.com/api/v1/users/';


export default async function getStats(string stats) {

const method = '/stats'
const days = 'last_7_days'

const params = {
    username : USER ,
    stats: 'last_7_days'
}


const call = axios.get(BASE_URL , {params});

console.log('displaying weekly progress (TODO: setting up the better d3 charts ith feeds)');






}

