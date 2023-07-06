import * as api from "../api";
export const postChat = (userId, prompt) => async (dispatch) => {
  try {
    dispatch({ type: "RESET_ERROR" });
    dispatch({ type: "CHAT_START_LOADING" });
    const { data } = await api.postChat(userId, prompt);
    dispatch({ type: "FETCH_CHAT", payload: data.chat.chat });
  } catch (error) {
    const err = { success: false, message: "something went wrong, try again" };
    dispatch({ type: "SET_ERROR", payload: err });
  }
};

export const fetchChat = ( id ) => async (dispatch) => {
  try {
    dispatch({ type: "RESET_ERROR" });
    dispatch({ type: "CHAT_START_LOADING" });
    const { data } = await api.getChat(id);
    const { chat } = data.chat;
    dispatch({ type: "FETCH_CHAT", payload: chat });
  } catch (error) {
    const err = { success: false, message: "something went wrong, try again" };
    dispatch({ type: "SET_ERROR", payload: err });
  }
};