const chatReducer = (states = {}, action) => {
    switch (action.type) {
      case "CHAT_START_LOADING":
        return { ...states, isLoading: true };
      case "FETCH_CHAT":
        return { isLoading: false, chat: action.payload };
      default:
        return states;
    }
  };
  
  export default chatReducer;