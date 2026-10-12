import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    // iterations: 50,
    vus: 10, // 10 virtual users
    duration: '30s', // 30 seconds
    // stages: [
    //     { duration: '30s', target: 20 }, // ramp up to 20 users over 30 seconds
    //     { duration: '1m30s', target: 10 }, // stay at 10 users for 1m30s
    //     { duration: '20s', target: 0 }, // ramp down to 0 users over 20 seconds
    // ],
    thresholds: {
        'http_req_failed': ['rate<0.01'], // http errors should be less than 1%>,
        'http_req_duration': ['p(90)<3000', 'max<5000'], // 90% of requests should be below 10ms, max below 20ms
    },
};

export default function () {
    const url = 'http://localhost:3000/login';

    const payload = JSON.stringify({
        username: 'rebeca',
        senha: '123'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = http.post(url, payload, params);

    check( response, {
        'status is 200': (r) => r.status === 200,
        'response body': (r) => r.body.includes('token'),
        'token is string': (r) => typeof JSON.parse(r.body).token === 'string',
    });

    sleep(1);

    // const response = http.post(url, payload, params);
    // console.log(response);
};

// K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-reportError.html k6 run test/login.test.js
