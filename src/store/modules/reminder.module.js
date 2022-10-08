import ReminderService from "@/services/reminder.service";
import dayjs from "dayjs";

const reminderInitialState = {
    allReminders: [],
    reminder: {},
    editReminder: {},
    apiErrorMsg: "",
};

export const reminder = {
    namespaced: true,
    state: reminderInitialState,
    actions: {
        getAllReminders({ commit }) {
            return ReminderService.getAllReminders()
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

        getReminderById({ commit }, id) {
            return ReminderService.getReminderById(id)
                .then(
                    (reminder) => {
                        commit("getReminderByIdSuccess", reminder);
                        return Promise.resolve(reminder);
                    },
                    (error) => {
                        commit("getReminderByIdFailure");
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
            return ReminderService.newReminder(newReminderData)
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
                    const errorMsg = error.response.data.message;
                    commit("updateApiErrorMsg", errorMsg);
                });
        },

        updateReminder({ commit }, editReminderData) {
            return ReminderService.updateReminder(editReminderData)
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
            return ReminderService.deleteReminder(id)
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

    },
    mutations: {
        getAllRemindersSuccess(state, allReminders) {
            allReminders.data.data.forEach((v) => {
                v.days = v.days_of_week.split(",").map(v => Number(v))
            })
            state.allReminders = allReminders.data.data;

            // userEvents.data.data.forEach((v) => {
            //     v.start = dayjs(v.start).format('YYYY-MM-DD')
            //     v.backgroundColor = '#6FD3BA',
            //         v.className = 'absence'
            //     v.display = 'background'
            //     v.textColor = '#fff'
            // })
            // state.userEvents.absencesBG = userEvents.data.data
            //
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
            state.reminder = state.allReminders.find(v => v.id === Number(id));
        },

        getReminderByIdSuccess(state, reminder) {
            state.reminder = reminder.data.data;
        },

        getReminderByIdFailure(state) {
            state.reminder = null;
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
    },
    getters: {
        allReminders: (state) => {
            return state.allReminders && state.allReminders;
        },

        reminderData: (state) => {
            return state.reminder && state.reminder;
        },
    },
};