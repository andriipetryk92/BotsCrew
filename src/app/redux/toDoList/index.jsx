import types from './types';

const initState = {
    tasks: [],
};

export default function (state = initState, action) {
    switch (action.type) {
        case types.ADD_TASK: {

            return {
                ...state,
                tasks: [
                    ...state.tasks, action.payload
                ]
            }
        }
        case types.DONE_TASK: {
            let data = [...state.tasks];
            if (action.payload !== -1) data.splice(action.payload, 1);

            return {
                ...state,
                tasks: [...data]
            }

        }
        case types.RENAME_VALUE: {
            let data = [...state.tasks]
            if (action.payload.index !== -1)
                data[action.payload.index].valueTask = action.payload.renameValue.charAt(0).toUpperCase() + action.payload.renameValue.slice(1)
            return {
                ...state,
                tasks: [...data]
            }
        }

        default: return state;
    }
}