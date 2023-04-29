
require('./bootstrap')
//axios adding
window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;


// vue js instance
window.Vue = require('vue');
import Vue from 'vue';

//import Sweetalert2 Notifications
import SwalHelper from "./Helpers/SwalHelper";
window.SwalHelper = SwalHelper;

//import All general used functions


