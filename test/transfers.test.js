import http from 'k6/http';
import { sleep, check } from 'k6';
import { getToken } from '../helpers/authentication.js';
import { getBaseUrl } from '../utils/variables.js';


export const options = {
  iterations: 1,
};

export default function() {
  const token = getToken();

  const url = getBaseUrl() + '/transferencias';

  const payload = JSON.stringify({
    "contaOrigem": 1,
    "contaDestino": 2,
    "valor": 11,
    "token": ""
  });

  const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

  let response = http.post(url, payload, params);

  check(response, {
    'status is 201': (r) => r.status === 201,
    'response body': (r) => r.body.includes('Transferência realizada com sucesso'),
  });
  
  sleep(1);
  
}
