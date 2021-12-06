import axios from "axios";
import authHeader from "./auth-header";

class AuthService {
  login(user) {
    return axios
      .post(
        `${process.env.VUE_APP_API}/login`,
        {
          email: user.email,
          password: user.password,
          is_admin: false,
        },
        { headers: { Accept: "application/json" } }
      )
      .then((response) => {
        if (response.data.token) {
          window.localStorage.setItem(
            "userInfo",
            JSON.stringify(response.data)
          );
        }
        return response.data;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  logout() {
    return axios
      .post(`${process.env.VUE_APP_API}/logout`, null, {
        headers: authHeader(),
      })
      .then((response) => {
        window.localStorage.removeItem("userInfo");
        return response.data;
      })
      .catch((error) => {
        window.localStorage.removeItem("userInfo");
        return Promise.reject(error);
      });
  }
}

export default new AuthService();
