import axios from 'axios';
import config from '../config';
function Header() {
    let header = {
        "content-Type": "application/json",
        Accept: "application/json,"
    }
    // if (Cookie.getCookie('userIn')) {
    //     header["x-access-token"] = JSON.parse(Cookie.getCookie('userIn')).token
    // }
    return header
}
function newHeader() {
    let header = {
        "content-Type": "multipart/form-data",
        Accept: "application/json,"
    }
    // if (Cookie.getCookie('userIn')) {
    //     header["x-access-token"] = JSON.parse(Cookie.getCookie('userIn')).token
    // }
    return header
}

export function api() {
    let data = {
        baseURL: config.api.trim(),
        headers: Header(),
    };
    return axios.create(data);
}
export function newApi (){
    let data = {
        baseURL: config.api.trim(),
        headers: newHeader(),
    };
    return axios.create(data);
 
}
