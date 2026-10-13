import http from 'k6/http';
import { getBaseUrl } from '../utils/variables.js';
const postLogin = JSON.parse(open('../fixtures/post.login.json'));



export function getToken() {
    const url = getBaseUrl() + '/login';
    
    const payload = JSON.stringify(postLogin);

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = http.post(url, payload, params);
    
    return response.json('token');
}
