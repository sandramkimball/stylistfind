import axios from 'axios';

// This function configures Axios to attach an Authorization: <token> header to requests for client-side authentication
export default function axiosWithAuth() {
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: 'https://stylistfind-db.herokuapp.com/api', 
    headers: {
      Authorization: token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
};
