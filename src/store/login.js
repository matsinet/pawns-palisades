import axios from "axios";
import global from "./global";
import jwt_decode from "jwt-decode";


export default {
  tabTitle: "RNR Shop Manager : Login",
  header: "RNR Shop Manager",
  view: "login",
  requireAuth: false,
  // Move these functions to the user store when implemented
  login: (email, password) => {
    axios.post(
      `${process.env.RNR_API_URL}/${process.env.VUE_APP_API_VERSION}/auth/login`,
      {
        "email": email,
        "password": password
      }
    )
    .then(response => {
      global.token = response.data.token;
      global.user = jwt_decode(response.data.token).user;
      window.sessionStorage.setItem('token', global.token);
      window.sessionStorage.setItem('user', global.user);
      window.router.navigate('/');
    });
  },
  logout: () => {
    global.token = null;
    global.user = {};
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('user');
    window.router.navigate('/');
  }
};