import axios from 'axios';

const api = axios.create({
  //baseURL: 'https://iu9od4xj7b.execute-api.us-east-1.amazonaws.com/prod',
  baseURL: process.env.REACT_APP_API_DOMAIN,
  headers: {tenant: 'forms'},
});

export function getForms() {
  return api
    .get(`/forms`)
    .then((res) => res.data)
    .catch((err) => err);
}

export function getForm(name, location) {
  return api
    .get(`/forms/${name}/${location}`)
    .then((res) => res.data)
    .catch((err) => err);
}

export function addForm(payload) {
  return api
    .post(`/forms`, payload)
    .then((res) => res.data)
    .catch((err) => err);
}
