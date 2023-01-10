import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
  token: null,
  user: {},
  // Move these functions to the user store when implemented
  login: async (email, password) => {
    await axios.post(
      `${process.env.RNR_API_URL}/v1/auth/login`,
      {
        "email": email,
        "password": password
      }
    )
    .then(function (response) {
      store.auth.token = response.data.token;
      store.auth.user = jwt_decode(response.data.token).user;
      window.sessionStorage.setItem('token', response.data.token);
      window.sessionStorage.setItem('user', JSON.stringify(store.auth.user));
      window.router.navigate('/');
    });
  },
  logout: () => {
    store.auth.token = null;
    store.auth.user = {};
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('user');
    window.router.navigate('/');
  }
};