import axios from 'axios';

const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api";

export function loadArticles() {
    return dispatch => {
        axios.get(`${url}/articles`)
            .then((res) => {
                let articles = res.data
                dispatch({ type: 'LOAD_ARTICLES', articles })
            })
    }
}

export function getUser(_id) {
    return dispatch => {
        axios.get(`${url}/user/${_id}`).then((res) => {
            return res.data
        })
    }

}

export function getUserProfile(_id) {
    return dispatch => {
        axios.get(`${url}/user/profile/${_id}`).then((res) => {
            let profile = res.data;
            dispatch({ type: 'SET_PROFILE', profile })
        }).catch(err => console.error);
    }
}

export function getArticle(article_id) {
    return dispatch => {
        axios.get(`${url}/article/${article_id}`).then((res) => {
            let article = res.data;
            dispatch({ type: 'VIEW_ARTICLE', article })
        }).catch(err => console.log(err))
    }
}

export function commentArticle(article_id, author_id, comment) {
    return (dispatch) => {
        let body = {
            article_id: article_id,
            author_id: author_id,
            comment: comment
        }
        axios.post(`${url}/article/comment`, body).then((res) => {
            if (res.status === 200) {
                dispatch({ type: 'COMMENT_ARTICLE', comment: { author: author_id, text: comment } })
            }
        })
    }
}

export function clap(article_id) {
    return dispatch => {
        axios.post(`${url}/article/clap`, { article_id }).then((res) => {
            dispatch({ type: 'CLAP_ARTICLE' })
        }).catch(err => console.log(err))
    }

}


export function followUser(id, follow_id) {
    return dispatch => {
        axios.post(`${url}/user/follow`, { id, follow_id }).then((res) => {
            dispatch({ type: 'FOLLOW_USER', follow_id })
        }).catch(err => console.log(err));
    }
}

export function signInUser(user_data) {
    return dispatch => {
        axios.post(`${url}/user`, user_data).then((res) => {
            let user = res.data;
            localStorage.setItem('Auth', JSON.stringify(user));
            dispatch({ type: 'SET_USER', user })
        }).catch((error) => console.log(error))
    }
}

export function toggleClose() {
    return (dispatch) => {
        dispatch({ type: 'TOGGLE_MODAL', modalMode: false })
    }
}
export function toggleOpen() {
    return (dispatch) => {
        dispatch({ type: 'TOGGLE_MODAL', modalMode: true })
    }
}