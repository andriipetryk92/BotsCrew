import types from './types';


export const rememberFocus = (data) => ({
    type: types.REMEMBER_FOCUS,
    payload: data
})
export const rememberName = (data) => ({
    type: types.REMEMBER_NAME,
    payload: data
})

