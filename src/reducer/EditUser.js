import {EDIT_USER} from './../actions/actions';

var initState={
    editusers: []
}

const EditUser = (state = initState, action) => {
    switch(action.type) {
        case EDIT_USER:
            return {
                ...state,
                editusers: action.editusers
            };
        default:
            return state;
    }
}

export default EditUser;