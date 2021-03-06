import * as APIUtil from '../util/post_api_util';

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_ONE_POST = "RECEIVE_ONE_POST";
export const POST_ERRORS = "POST_ERRORS";
export const REMOVE_POST = "REMOVE_POST";
export const REMOVE_UNFOLLOW = "REMOVE_UNFOLLOW";
export const CLEAR_POSTS = "CLEAR_POSTS";

// sync actions
export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

export const receiveOnePost = post => ({
  type: RECEIVE_ONE_POST,
  post,
});

export const removePosts = posts => ({
  type: REMOVE_POST,
  posts,
});

export const removeUnfollowPosts = id => ({
  type: REMOVE_UNFOLLOW,
  id,
});

export const postError = error => ({
  type: POST_ERRORS,
  error
});

export const clearPost = () => ({
  type: CLEAR_POSTS,
});

// async actions
export function createPost(post) {
  return (dispatch) => {
    return APIUtil.createPost(post)
      .then(onePost => dispatch(receiveOnePost(onePost)),
      errors => dispatch(postError(errors))
    );
  };
}

export function createImagePost(post) {
  return (dispatch) => {
    return APIUtil.createImagePost(post)
      .then(onePost => dispatch(receiveOnePost(onePost)),
      errors => dispatch(postError(errors))
    );
  };
}

export function likePost(post) {
  return (dispatch) => {
    return APIUtil.likePost(post)
      .then(onePost => dispatch(receiveOnePost(onePost)),
      errors => dispatch(postError(errors))
    );
  };
}

export function unlikePost(post) {
  return (dispatch) => {
    return APIUtil.unlikePost(post)
      .then(onePost => dispatch(receiveOnePost(onePost)),
      errors => dispatch(postError(errors))
    );
  };
}

export function unfollowPost(post) {
  return (dispatch) => {
    return APIUtil.unfollowPost(post)
      .then(() => dispatch(removeUnfollowPosts(post.author_id)),
      errors => dispatch(postError(errors))
    );
  };
}

export function editPost(post) {
  return (dispatch) => {
    return APIUtil.editPost(post)
      .then(onePost => dispatch(receiveOnePost(onePost)),
      errors => dispatch(postError(errors))
    );
  };
}

export function editFilePost(post) {
  return (dispatch) => {
    return APIUtil.editFilePost(post)
      .then(onePost => dispatch(receiveOnePost(onePost)),
      errors => dispatch(postError(errors))
    );
  };
}

export function destroyPost(post) {
  return (dispatch) => {
    return APIUtil.destroyPost(post)
      .then((post) => dispatch(removePosts(post)),
      errors => dispatch(postErrors(errors))
    );
  };
}

export function requestPosts(page) {
  return (dispatch) => {
    return APIUtil.fetchPosts(page)
      .then(posts => dispatch(receivePosts(posts)),
      errors => dispatch(postError(errors))
    );
  };
}

export function clearPosts() {
  return (dispatch) => {
    return () => { dispatch(clearPost); };
  };
}

export function requestOnePost(post_id) {
  return (dispatch) => {
    return APIUtil.fetchOnePost(post_id)
      .then(post => dispatch(receiveOnePost(post)),
      errors => dispatch(postError(errors))
    );
  };
}
