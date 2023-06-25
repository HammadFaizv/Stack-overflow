import * as api from '../api/index'
import { setCurrentUser } from './currentUser'
export const signup = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signup(authData)
        dispatch({ type: 'AUTH', data })
        dispatch(setCurrentUser( JSON.parse(localStorage.getItem("Profile")) ));
        navigate('/')
    }catch (error) {
        console.log("action auth signup error: "+error);
    }
}

export const login = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.logIn(authData)
        dispatch({ type: 'AUTH', data })
        dispatch(setCurrentUser( JSON.parse(localStorage.getItem("Profile")) ));
        navigate('/')
    }catch (error) {
        console.log("action auth login error: "+ error);
    }
}