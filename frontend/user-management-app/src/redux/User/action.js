import axios from 'axios';

import { ADD_USER, DELETE_USER, GET_USER, UPDATE_USER, USER_ERROR, USER_REQUEST } from "../ActionTypes/actionTypes"

const userRequestAction = () => {
    return {
        type: USER_REQUEST
    }
}

const userErrorAction = (error) => {
    return {
        type: USER_ERROR,
        payload: error
    }
}

const getUserAction = (user) => {
    return {
        type: GET_USER,
        payload: user
    }
}

const addUserAction = (user) => {
    return {
        type: ADD_USER,
        payload: user
    }
}


const updateUserAction = (payload) => {
    return {
        type: UPDATE_USER,
        payload
    }
}


const deleteUserAction = () => {
    return {
        type: DELETE_USER
    }
}


export const getUser = (payload) => (dispatch) => {

    dispatch(userRequestAction());

    return axios({
        method: 'GET',
        url: `${process.env.REACT_APP_BASEURL}/view`,
        params: payload
    }).then((res) => {
        const totalCount = res.headers.get('X-Total-Count');
        console.log("==> at action", res.data, totalCount);
        dispatch(getUserAction({ data: res.data, totalCount }));
    }).catch(err => {
        dispatch(userErrorAction(err));
    })

}


export const addUser = (payload) => (dispatch) => {

    dispatch(userRequestAction());

    axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BASEURL}/add`,
        data: payload
    }).then((res) => {
        if (res.data.status === 409) {
            alert(res.data.message);
        } else {
            dispatch(addUserAction(res.data));
        }
    }).catch(err => {
        dispatch(userErrorAction(err));
    })

}


export const updateUser = (payload) => (dispatch) => {

    dispatch(userRequestAction());

    axios({
        method: 'PATCH',
        url: `${process.env.REACT_APP_BASEURL}/edit/${payload.userId}`,
        data: payload.user
    }).then((res) => {
        dispatch(updateUserAction(payload.user))
    }).catch((error) => {
        dispatch(userErrorAction(error));
    })
}



export const deleteUser = (id) => (dispatch) => {

    dispatch(userRequestAction());

    axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_BASEURL}/delete/${id}`
    }).then((res) => {
        dispatch(deleteUserAction({ payload: id }));
    }).catch((error) => {
        dispatch(userErrorAction(error));
    })
}