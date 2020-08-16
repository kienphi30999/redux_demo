import {ADD_USER, DELETE_USER, FETCH_USER, UPDATE_USER} from '../actions/actions';

var initState = {
    users: [],
};

const findIndex = (users, id) => {
    let res = -1;
    users.map( (user,index) => {
        if(user.id === id) {
            res = index;
        }
    });
    return res;
}

const reducers = (state = initState, action) => {
    switch(action.type) {
        case FETCH_USER:
            return {
                ...state,
                users: action.users,
            };
        case ADD_USER:
            return {
                ...state,
                users: state.users.concat(action.user),
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => {
                    return action.id !== user.id
                })
            }
        case UPDATE_USER:
            const index = findIndex(state.users, action.user.id);
            state.users[index] = action.user;
            console.log("UPDATE users: ", state.users);
            return{
                ...state,
                users: [...state.users]
            };
        default:
            return state;
    }
}

export default reducers;
