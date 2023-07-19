import * as api from '../api/index';

export const fetchPosts = () => async (dispatch) => {
    try {
        const { data } = await api.getPosts();
        dispatch({ type: "FETCH_ALL_POSTS", payload: data})
    } catch (error) {
        console.log("fetch posts error: " + error)
    }
}

export const addPost = (data) => async (dispatch) => {
    try {
        console.log(data);
        const result = await api.addPost(data);
        dispatch({ type: "ADD_POST", payload: result})
        dispatch(fetchPosts())
    } catch (err) {
        console.log("add post error:" + err)
    }
} 

export const likePost = ( id, userId ) => async (dispatch) => {
    try {
        await api.likePost(id, userId);
        dispatch(fetchPosts());
    } catch (err) {
        console.log("like post error:" + err);
    }
}

export const dislikePost = ( id, userId ) => async (dispatch) => {
    try {
        await api.dislikePost(id, userId);
        dispatch(fetchPosts());
    } catch (err) {
        console.log("dislike post error:" + err);
    }
}