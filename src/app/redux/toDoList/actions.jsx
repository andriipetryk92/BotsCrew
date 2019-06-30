import types from './types';


export const addTask = (data) => ({
    type: types.ADD_TASK,
    payload: data
})
export const doneTask = (data) => ({
    type: types.DONE_TASK,
    payload: data
})
export const renameValue = (data) => ({
    type: types.RENAME_VALUE,
    payload: data
})


