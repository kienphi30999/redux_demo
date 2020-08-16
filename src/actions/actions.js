import axios from 'axios';

export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const FETCH_USER = "FETCH_USER";
export const UPDATE_USER = "UPDATE_USER"
export const EDIT_USER = "EDIT_USER";

export const FetchUser = (users) => {
    return {
        type: "FETCH_USER",
        users,
    }
}

export const FetchUserRequest = () => {
    return dispatch => {
        return axios({
            method: "GET",
            url: "https://5f17e9887c06c900160dc5f7.mockapi.io/api/users",
            data: null
        }).then(res => {
            dispatch(FetchUser(res.data));
        }).catch(err => {
            console.log(err);
        })
    };
}

export const AddUser = (user) => {
    return {
        type: "ADD_USER",
        user,
    }
}

export const AddUserRequest = (user) => {
    return dispatch => {
        return axios({
            method: "POST",
            url: `https://5f17e9887c06c900160dc5f7.mockapi.io/api/users`,
            data: user
            }).then(res => {
                dispatch(AddUser(res.data));
            }).catch(err => {
                console.log(err);
            })
    }
}

export const DeleteUserRequest = (id) => {
    return dispatch => {
        return  axios({
            method: "DELETE",
            url: `https://5f17e9887c06c900160dc5f7.mockapi.io/api/users/${id}`,
            data: null
            }).then(res => {
                dispatch(DeleteUser(id));
            }).catch(err => {
                console.log(err);
            })
    }
}
export const DeleteUser = (id) => {
    return {
        type: "DELETE_USER",
        id,
    }
}

export const EditUserRequest = (id) => {
    return dispatch => {
        return axios({
            method: "GET",
            url: `https://5f17e9887c06c900160dc5f7.mockapi.io/api/users/${id}`,
            data: null
            }).then(res => {
                dispatch(EditUser(res.data));
            }).catch(err => {
                console.log(err);
            })
    }
}
export const EditUser = (editusers) => {
    return {
        type: "EDIT_USER",
        editusers
    }
}

export const UpdateUserRequest = (user) => {
    return dispatch => {
        return axios({
            method: "PUT",
            url: `https://5f17e9887c06c900160dc5f7.mockapi.io/api/users/${user.id}`,
            data: user
            }).then(res => {
                dispatch(UpdateUser(res.data));
            }).catch(err => {
                console.log(err);
            })
    }
}

export const UpdateUser = (user) => {
    return{
        type: "UPDATE_USER",
        user
    }
}