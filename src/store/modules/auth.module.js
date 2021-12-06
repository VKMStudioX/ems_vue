import AuthService from "../../services/auth.service";

const user = JSON.parse(localStorage.getItem("userInfo"));
const authInitialState = user
  ? {
      status: { loggedIn: true },
      user,
      errorMsg: "",
    }
  : {
      status: { loggedIn: false },
      user: null,
      errorMsg: "",
    };

export const auth = {
  namespaced: true,
  state: authInitialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user)
        .then(
          (user) => {
            commit("loginSuccess", user);
            return Promise.resolve(user);
          },
          (error) => {
            commit("loginFailure");
            return Promise.reject(error);
          }
        )
        .catch((error) => {
          const errorMsg = error.response.data.message;
          commit("updateAuthApiErrorMsg", errorMsg);
        });
    },
    logout({ commit }) {
      return AuthService.logout()
        .then(
          (user) => {
            commit("logout");
            return Promise.resolve(user);
          },
          (error) => {
            commit("logout");
            return Promise.reject(error);
          }
        )
        .catch((error) => {
          const errorMsg = error.response.data.message;
          commit("updateAuthApiErrorMsg", errorMsg);
        });
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    updateAuthApiErrorMsg(state, errorMsg) {
      state.errorMsg = errorMsg;
    },
  },
  getters: {
    user: (state) => {
      return state.user ? state.user : null;
    },
    userEmail: (state) => {
      return state.user.user ? state.user.user.email : null;
    },
    userId: (state) => {
      return state.user.user ? state.user.user.id : null;
    },
    userIsAdmin: (state) => {
      return state.user.user.is_admin === true;
    },
    userIsLogged: (state) => {
      return state.status.loggedIn ? state.status.loggedIn : null;
    },
    authErrorMsg: (state) => {
      return state.errorMsg && state.errorMsg;
    },
  },
};
