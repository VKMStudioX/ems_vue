import userService from "../../services/user.service";
import dayjs from "dayjs";

const userInitialState = {
    userEvents: {
      absences: [],
    },
    userAbsences: [],
    userAbsencesFromAPI: [],
    userApiErrorMsg: "",
};

export const user = {
  namespaced: true,
  state: userInitialState,
  actions: {
    getUserEvents({ commit }, id) {
      return userService.getUserEvents(id)
        .then(
          (userEvents) => {
            commit("getUserEventsSuccess", userEvents);
            return Promise.resolve(userEvents);
          },
          (error) => {
            commit("getUserEventsFailure");
            return Promise.reject(error);
          }
        )
        .catch((error) => {
          const errorMsg = error.response.data.message;
          commit("updateUserApiErrorMsg", errorMsg);
        });
    },

    getUserAbsences({ commit }, id) {
        return userService.getUserAbsences(id)
          .then(
            (userAbsences) => {
              commit("getUserAbsencesSuccess", userAbsences);
              return Promise.resolve(userAbsences);
            },
            (error) => {
              commit("getUserAbsencesFailure");
              return Promise.reject(error);
            }
          )
          .catch((error) => {
            const errorMsg = error.response.data.message;
            commit("updateUserApiErrorMsg", errorMsg);
          });
      },

      manageUserAbsences({ commit }, userAbsencesData) {
        return userService.manageUserAbsences(userAbsencesData)
          .then(
            (userAbsencesDataFromAPI) => {
              commit("manageUserAbsencesSuccess", userAbsencesDataFromAPI);
              return Promise.resolve(userAbsencesDataFromAPI);
            },
            (error) => {
              commit("manageUserAbsencesFailure");
              return Promise.reject(error);
            }
          )
          .catch((error) => {
            const errorMsg = error.response.data.message;
            commit("updateUserApiErrorMsg", errorMsg);
          });
      },

  },
  mutations: {
    getUserEventsSuccess(state, userEvents) {
      userEvents.data.data.forEach((v) => {
        v.start = dayjs(v.start).format('YYYY-MM-DD')
        v.backgroundColor = '#6FD3BA',
        v.className = 'absence'
        v.display = 'background'
        v.textColor = '#fff'
      })
      state.userEvents.absencesBG = userEvents.data.data

    },
    getUserEventsFailure(state) {
      state.userEvents = null;
    },

    getUserAbsencesSuccess(state, userAbsences) {
      state.userAbsences = userAbsences.data.data;
    },
    getUserAbsencesFailure(state) {
    state.userAbsences = null;
    },

    manageUserAbsencesSuccess(state, userAbsencesFromAPI) {
      state.userAbsencesFromAPI = userAbsencesFromAPI.data;
    },
    manageUserAbsencesFailure(state) {
      state.userAbsencesFromAPI = null;
    },

    updateUserApiErrorMsg(state, errorMsg) {
        state.userApiErrorMsg = errorMsg;
    }

  },
  getters: {
    userEvents: (state) => {
      return state.userEvents && state.userEvents;
    },
    userAbsences: (state) => {
      return state.userAbsences.length > 0 && state.userAbsences.map(date => (dayjs(date.start).toDate()));
    },
}
}