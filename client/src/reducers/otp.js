const otpReducer = (state= { sending:false, verify:false, verified: 0 }, action) => {
    switch (action.type) {
        case 'SENDING':
            return { ...state, sending: true }
        case 'SENT':
            return { ...state, sending: false };
        case 'VERIFYING':
            return { ...state, verify: true };
        case 'VERIFIED':
            return { ...state, verify: false, verified: 1 };
        case 'UNVERIFIED':
            return { ...state, verify: false, verified: 0};
        default:
            return state;
    }
}

export default otpReducer