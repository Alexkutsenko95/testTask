import {DELETE_DATA, FETCH_DATA, PATCH_DATA, POST_DATA} from "./types";
import axios from '../utils/axios'

export function fetchUsers() {
    return axios.get(`/api/contacts/`).then(res => res.data);
}

export function patchUsers(action) {
    return axios.put(`/api/contacts/${action.id}`, {
        email: action.email,
        name: action.name
    }).then(res => res.data);
}

export function postUser(action) {
    return axios.post(`/api/contacts/`, {
        email: action.email,
        name: action.name
    }).then(res => res.data);
}

export function deleteUsers(action) {
    return axios.delete(`/api/contacts/${action.id}`);
}

export const fetchData = () => ({
    type: FETCH_DATA
});
export const patchData = (payload) => ({
    type: PATCH_DATA, payload
});
export const postData = (payload) => ({
    type: POST_DATA, payload
});
export const deleteData = (payload) => ({
    type: DELETE_DATA, payload
});
