import axios from 'axios';

class API {
    constructor() {
        this.baseUrl = 'https://growdev-test-node.herokuapp.com';
    }

    get(url){
        const api = axios.create({
            baseURL: this.baseUrl,
        });

        return api.get(url)
    }

    getAutenticado(url, token) {
        const api = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },            
        });

        return api.get(url);
    }  

    post(url, dados){
        const api = axios.create({
            baseURL: this.baseUrl,
            headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            },
        });

        return api.post(url, dados);
    }
}

export default new API();