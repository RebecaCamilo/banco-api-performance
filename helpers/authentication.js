import http from 'k6/http';
const postLogin = JSON.parse(open('../fixtures/post.login.json'));


export function getToken() {
    const url = 'http://localhost:3000/login';
    
    const payload = JSON.stringify(postLogin);

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = http.post(url, payload, params);
    
    return response.json('token');
}
