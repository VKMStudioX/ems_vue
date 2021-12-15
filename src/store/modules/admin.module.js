import AdminService from "@/services/admin.service";
import dayjs from "dayjs";

const adminInitialState = {
  allUsersEvents: {
    reminders: [],
    remindersBG: [],
    absences: [],
    absencesBG: []
  },
  allUsers: {
    users: []
  },
  allReminders: {
    reminders: []
  },
  reminder: {},
  editReminder: {},
  user: {},
  editUser: {},
  holidays: {},
  holidaysFromAPI: {},
  apiErrorMsg: "",
};

export const admin = {
  namespaced: true,
  state: adminInitialState,
  actions: {
    getAllUsersEvents({ commit }) {
      return AdminService.getAllUsersEvents()
        .then(
          (allUsersEvents) => {
            commit("getAllUsersEventsSuccess", allUsersEvents);
            return Promise.resolve(allUsersEvents);
          },
          (error) => {
            commit("getAllUsersEventsFailure");
            return Promise.reject(error);
          }
        )
        .catch((error) => {
          const errorMsg = error.response.data.message;
          commit("updateApiErrorMsg", errorMsg);
        });
    },

    getAllUsers({ commit }) {
      return AdminService.getAllUsers()
        .then(
          (allUsers) => {
            commit("getAllUsersSuccess", allUsers);
            return Promise.resolve(allUsers);
          },
          (error) => {
            commit("getAllUsersFailure");
            return Promise.reject(error);
          }
        )
        .catch((error) => {
          const errorMsg = error.response.data.message;
          commit("updateApiErrorMsg", errorMsg);
        });
    },

   getNewUser({ commit }) {
      return commit("getNewUserSuccess");
    },

    registerUser({ commit }, newUserData) {
      return AdminService.registerUser(newUserData)
        .then(
          (newUserDataFromAPI) => {
            commit("registerUserSuccess", newUserDataFromAPI);
            return Promise.resolve(newUserDataFromAPI);
          },
          (error) => {
            commit("registerUserFailure");
            return Promise.reject(error);
          }
        )
        .catch((error) => {
          let errorMsg = error.response.data.message;
          if (error.response.data.errors.email) {
            error.response.data.errors.email.forEach(
              (err) => (errorMsg = errorMsg.concat(" - ", err))
            );
          }
          if (error.response.data.errors.password) {
            error.response.data.errors.password.forEach(
              (err) => (errorMsg = errorMsg.concat(" - ", err))
            );
          }
          commit("updateApiErrorMsg", errorMsg);
        });
    },

    updateUser({ commit }, editUserData) {
      return AdminService.updateUser(editUserData)
        .then(
          (editUserDataFromAPI) => {
            commit("updateUserSuccess", editUserDataFromAPI);
            return Promise.resolve(editUserDataFromAPI);
          },
          (error) => {
            commit("updateUserFailure");
            return Promise.reject(error);
          }
        )
        .catch((error) => {
          const errorMsg = error.response.data.message;
          commit("updateApiErrorMsg", errorMsg);
        });
    },

    deleteUser({ commit }, id) {
      return AdminService.deleteUser(id)
        .then(
          (deletedUser) => {
            return Promise.resolve(deletedUser);
          },
          (error) => {
            return Promise.reject(error);
          }
        )
        .catch((error) => {
          const errorMsg = error.response.data.message;
          commit("updateApiErrorMsg", errorMsg);
        });
    },

getAllReminders({ commit }) {
      return AdminService.getAllReminders()
        .then(
          (allReminders) => {
            commit("getAllRemindersSuccess", allReminders);
            return Promise.resolve(allReminders);
          },
          (error) => {
            commit("getAllRemindersFailure");
            return Promise.reject(error);
          }
        )
        .catch((error) => {
          const errorMsg = error.response.data.message;
          commit("updateApiErrorMsg", errorMsg);
        });
    },


    getNewReminder({ commit }) {
      return commit("getNewReminderSuccess");
    },

    newReminder({ commit }, newReminderData) {
        return AdminService.newReminder(newReminderData)
          .then(
            (newReminderDataFromAPI) => {
              commit("newReminderSuccess", newReminderDataFromAPI);
              return Promise.resolve(newReminderDataFromAPI);
            },
            (error) => {
              commit("newReminderFailure");
              return Promise.reject(error);
            }
          )
          .catch((error) => {
            let errorMsg = error.response.data.message;
            if (error.response.data.errors.email) {
              error.response.data.errors.email.forEach(
                (err) => (errorMsg = errorMsg.concat(" - ", err))
              );
            }
            if (error.response.data.errors.password) {
              error.response.data.errors.password.forEach(
                (err) => (errorMsg = errorMsg.concat(" - ", err))
              );
            }
            commit("updateApiErrorMsg", errorMsg);
          });
      },
  
      updateReminder({ commit }, editReminderData) {
        return AdminService.updateReminder(editReminderData)
          .then(
            (editReminderDataFromAPI) => {
              commit("updateReminderSuccess", editReminderDataFromAPI);
              return Promise.resolve(editReminderDataFromAPI);
            },
            (error) => {
              commit("updateReminderFailure");
              return Promise.reject(error);
            }
          )
          .catch((error) => {
            const errorMsg = error.response.data.message;
            commit("updateApiErrorMsg", errorMsg);
          });
      },
  
      deleteReminder({ commit }, id) {
        return AdminService.deleteReminder(id)
          .then(
            (deletedReminder) => {
              return Promise.resolve(deletedReminder);
            },
            (error) => {
              return Promise.reject(error);
            }
          )
          .catch((error) => {
            const errorMsg = error.response.data.message;
            commit("updateApiErrorMsg", errorMsg);
          });
      },


      getHolidays({ commit }) {
        return AdminService.getHolidays()
          .then(
            (holidays) => {
              commit("getHolidaysSuccess", holidays);
              return Promise.resolve(holidays);
            },
            (error) => {
              commit("getHolidaysFailure");
              return Promise.reject(error);
            }
          )
          .catch((error) => {
            const errorMsg = error.response.data.message;
            commit("updateApiErrorMsg", errorMsg);
          });
      },

      manageHolidays({ commit }, holidays) {
        return AdminService.manageHolidays(holidays)
          .then(
            (holidaysFromAPI) => {
              commit("manageHolidaysSuccess", holidaysFromAPI);
              return Promise.resolve(holidaysFromAPI);
            },
            (error) => {
              commit("manageHolidaysFailure");
              return Promise.reject(error);
            }
          )
          .catch((error) => {
            const errorMsg = error.response.data.message;
            commit("updateApiErrorMsg", errorMsg);
          });
      },

  },
  mutations: {
    getAllUsersEventsSuccess(state, allUsersEvents) {
      allUsersEvents.data.user_absences.forEach((v) => {
        v.start = dayjs(v.start).set('date', dayjs(v.start).get('date')+1).format('YYYY-MM-DD'),
        v.title = `${v.first_name} ${v.last_name} - ${v.type}`
      })

      allUsersEvents.data.user_absences_BG.forEach((v) => {
        v.start = dayjs(v.start).set('date', dayjs(v.start).get('date')+1).format('YYYY-MM-DD')
      })

      state.allUsersEvents.absences = allUsersEvents.data.user_absences
      state.allUsersEvents.absencesBG = allUsersEvents.data.user_absences_BG
      state.allUsersEvents.reminders = allUsersEvents.data.user_reminders
    },

    getAllUsersEventsFailure(state) {
      state.allUsersEvents = null;
    },

    getAllUsersSuccess(state, allUsers) {
      state.allUsers = allUsers.data;
    },

    getAllUsersFailure(state) {
      state.allUsers = null;
    },

    getNewUserSuccess(state) {
      state.user = {
        id: "",
        email: "",
        first_name: "",
        last_name: "",
        is_admin: false,
      };
    },

    

    getUserById(state, id) {
      const userArray = state.allUsers.users.filter(
        (v) => v.id === Number(id)
      );
      state.user = userArray[0];
    },

    registerUserSuccess(state, newUserDataFromAPI) {
      state.editUser = newUserDataFromAPI.data;
    },
    registerUserFailure(state) {
      state.editUser = null;
    },

    updateUserSuccess(state, updateUserDataFromAPI) {
      state.editUser = updateUserDataFromAPI.data;
    },
    updateUserFailure(state) {
      state.editUser = null;
    },


    getAllRemindersSuccess(state, allReminders) {
      state.allReminders = allReminders.data;
    },

    getAllRemindersFailure(state) {
      state.allReminders = null;
    },

    getNewReminderSuccess(state) {
      state.reminder = {
        selectedDOW: '',
        selectedHOR: '',
        titleOfReminder: '',
        activeReminder: false,
        textOfReminder: '',
      };
    },

    getReminderById(state, id) {
      const remindersArray = state.allReminders.reminders.filter(
        (v) => v.id === Number(id)
      );
      state.reminder = remindersArray[0];
    },

    newReminderSuccess(state, newReminderDataFromAPI) {
        state.editReminder = newReminderDataFromAPI.data;
      },
      newReminderFailure(state) {
        state.editReminder = null;
      },
  
      updateReminderSuccess(state, updateReminderDataFromAPI) {
        state.editReminder = updateReminderDataFromAPI.data;
      },
      updateReminderFailure(state) {
        state.editReminder = null;
      },

    updateApiErrorMsg(state, errorMsg) {
      state.apiErrorMsg = errorMsg;
    },

    getHolidaysSuccess(state, holidays) {
      state.holidays = holidays.data.holidays;
    },

    getHolidaysFailure(state) {
      state.holidays = null;
    },

    manageHolidaysSuccess(state, holidaysFromAPI) {
      state.holidaysFromAPI = holidaysFromAPI.data;
    },
    manageHolidaysFailure(state) {
      state.holidaysFromAPI = null;
    },
  },
  getters: {
    allUsersEvents: (state) => {
      return state.allUsersEvents && state.allUsersEvents;
    },

    allUsers: (state) => {
      return state.allUsers && state.allUsers.users;
    },

    userData: (state) => {
      return state.user && state.user;
    },

    allReminders: (state) => {
      return state.allReminders && state.allReminders.reminders;
    },

    reminderData: (state) => {
      return state.reminder && state.reminder;
    },

    holidays: (state) => {
      return state.holidays.length > 0 && state.holidays.map(date => (dayjs(date.start).toDate()));
    },

    apiErrorMsg: (state) => {
      return state.apiErrorMsg && state.apiErrorMsg;
    },
  },
};
