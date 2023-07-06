import * as api from '../api/index';

export const sendOtp = (userId, email) => async (dispatch) => {
    try{
        dispatch({ type: "SENDING" })
        const { data } = await api.sendOtp(userId, email);
        dispatch({ type: "SENT" })
        console.log(data);
        alert("OTP HAS BEEN SENT TO THE EMAIL");
    }catch (err){
        console.log('otp error', err);
    }
}

export const verifyOtp = (email, code) => async (dispatch) => {
    try{
        dispatch({ type: "VERIFYING" })
        const { data } = await api.verifyOtp(email, code);
        console.log("verified otp",data);
        if( data.verified ){
            alert("✅ Verified!!!");
            dispatch({ type: "VERIFIED" })
        } else {
            alert("❌Invalid OTP!!! TRY AGAIN");
            dispatch({ type: "UNVERIFIED" })
        }
    } catch (err){
        console.log('otp verification error',err);
    }
}