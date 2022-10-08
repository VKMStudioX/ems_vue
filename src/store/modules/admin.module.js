import AdminService from "@/services/admin.service";
import dayjs from "dayjs";

const adminInitialState = {
    allUsersEvents: {
        absences: [],
        absencesBG: []
    },
    allUsers: {
        users: []
    },
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

        getUserById({ commit }, id) {
            return AdminService.getUserById(id)
                .then(
                    (user) => {
                        commit("getUserByIdSuccess", user);
                        return Promise.resolve(user);
                    },
                    (error) => {
                        commit("getUserByIdFailure");
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
            allUsersEvents.data.data.forEach((v) => {
                v.start = dayjs(v.start).format('YYYY-MM-DD'),
                    v.users.forEach(vu => v.title = `${vu.first_name} ${vu.last_name}`)
            })

            state.allUsersEvents.absences = allUsersEvents.data.data
        },

        getAllUsersEventsFailure(state) {
            state.allUsersEvents = null;
        },

        getAllUsersSuccess(state, allUsers) {
            state.allUsers = allUsers.data.data;
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

        getUserByIdSuccess(state, user) {
            state.user = user.data.data;
        },

        getUserByIdFailure(state) {
            state.user = null;
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

        getHolidaysSuccess(state, holidays) {
            state.holidays = holidays.data.data;
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

        updateApiErrorMsg(state, errorMsg) {
            state.apiErrorMsg = errorMsg;
        },

    },
    getters: {
        allUsersEvents: (state) => {
            return state.allUsersEvents && state.allUsersEvents;
        },

        allUsers: (state) => {
            return state.allUsers && state.allUsers; // state.allUsers.users
        },

        userData: (state) => {
            return state.user && state.user;
        },

        holidays: (state) => {
            return state.holidays.length > 0 && state.holidays.map(date => (dayjs(date.start).toDate()));
        },

        apiErrorMsg: (state) => {
            return state.apiErrorMsg && state.apiErrorMsg;
        },
    },
};