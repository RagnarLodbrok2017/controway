
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
if (auth_user) {
    localStorage.setItem('id', auth_user.id);
    localStorage.setItem('name', auth_user.name);
}
function getAuthUser(){
    axios.get(base_url + 'api/auth/user')
        .then(response =>{
            localStorage.setItem('id', response.data.user.id);
            localStorage.setItem('username', response.data.user.name);
        })
        .catch(err => {
            console.log(err);
        })
}

const token = sessionStorage.getItem('token');
if (token){
    axios.interceptors.request.use(
        config => {
            localStorage.setItem('token', token);
            config.headers['Authorization'] = 'Bearer ' + token;
        }
    );
}

