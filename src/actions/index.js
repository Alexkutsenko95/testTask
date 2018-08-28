import {DELETE_DATA, FETCH_DATA, FETCH_DATA_SUCCESS, PATCH_DATA, POST_DATA} from "./types";
import axios from "axios/index";
import {push} from "react-router-redux";

var instance = axios.create({
    baseURL: 'http://localhost:3001/',
});

export const fetchData = () => async dispatch => {
    try {
        dispatch({
            type: FETCH_DATA
        });

        instance.get(`/api/contacts/`)
            .then((response) => {
                dispatch({
                    type: FETCH_DATA_SUCCESS,
                    payload: response.data
                });
            })
    } catch (error) {
        console.error(error);
    }
};
export const patchData = (values) => async dispatch => {
    try {
        instance.put(`/api/contacts/${values.id}`, {
            email: values.email,
            name: values.name
        })
            .then((response) => {
                dispatch({
                    type: PATCH_DATA,
                    payload: response.data
                });
                dispatch(push('/'))
            })
    } catch (error) {
        console.error(error);
    }
};
export const postData = (values) => async dispatch => {
    try {
        instance.post(`/api/contacts/`, {
            email: values.email,
            name: values.name
        })
            .then((response) => {
                dispatch({
                    type: POST_DATA,
                    payload: response.data
                });
                dispatch(push('/'))
            })
    } catch (error) {
        console.error(error);
    }
};
export const deleteData = (values) => async dispatch => {
    try {
        instance.delete(`/api/contacts/${values.id}`)
            .then(() => {
                Promise.all([dispatch({
                    type: DELETE_DATA,
                    payload: values
                }), dispatch(push('/'))
                ]);
            })
    } catch (error) {
        console.error(error);
    }
};
