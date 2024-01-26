import { ADD_USER, DELETE_USER, GET_USER, UPDATE_USER, USER_ERROR, USER_REQUEST } from "../ActionTypes/actionTypes"

const initialState = {
    users: [],
    isLoading: false,
    isError: false,
    error: '',
    totalCount: 0
}

export const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case USER_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isError: false,
                error: ''
            }
        }

        case USER_ERROR: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: payload
            }
        }

        case GET_USER: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                error: '',
                users: payload.data.data,
                totalCount: +payload.totalCount
            }
        }

        case ADD_USER: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                error: '',
                users: [...state.users, payload.data]
            }
        }

        case UPDATE_USER: {
            console.log("payload at update", payload);
            return {
                ...state,
                isLoading: false,
                isError: false,
                error: '',
                users: state.users.map((item) => {
                    if (item.id !== payload.id) {
                        return item
                    }
                    return { ...item, ...payload }
                })
            }
        }

        case DELETE_USER: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                error: '',
                users: state.users.filter(item => item.id !== payload)
            }
        }

        default:
            return state
    }
}