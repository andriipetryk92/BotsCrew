import types from './types';

const initState = {
    user: [],
};

export default function (state = initState, action) {
    switch (action.type) {
        case types.REMEMBER_FOCUS: {
            return {
                ...state,
                user: [
                    ...state.user, action.payload
                ]
            }
        }
        case types.REMEMBER_NAME: {
                        return {
                ...state,
                user: [
                    ...state.user, action.payload
                ]
            }
        }

        default: return state;
    }
}