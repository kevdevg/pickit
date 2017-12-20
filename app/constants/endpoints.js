const url = 'http://localhost:8000';

const endpoints = {
  posts: `${url}/posts`,
  post: `${url}/post/`,
  login: `${url}/rest-auth/login/`,
  register: `${url}/rest-auth/registration/`,
  entries: `${url}/entries/`,
};

export default endpoints;
