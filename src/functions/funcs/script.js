import axios from 'axios'
import { handleCors } from '../../hooks';
let baseUrl = 'https://sore-pear-dog-hat.cyclic.app';

export async function checkAuth(idToken) {
    return await axiosGetRoute({}, '/', { 'AuthToken': idToken })
}

export async function axiosGetRoute(params, url, headers) {
    try {
        const res = await axios.get(baseUrl + url, {
            headers: headers ?? {},
            params: params
        });
        return res;
    } catch (error) {
        console.log(error)
    }
  
}

export async function axiosPostRoute(params, url) {
    try {
        const res = await axios.post(baseUrl + url, {
            params: params
        });
        return res;
    } catch (error) {
        console.log(error)
    }
}
export async function handle({ request, resolve }) {
    const response = await resolve(request);
    return handleCors(request, response);
}

