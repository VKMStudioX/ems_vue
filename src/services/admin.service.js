import axios from "axios";
import authHeader from "./auth-header";

class AdminService {
    getAllUsersEvents() {
        return axios.get(`${process.env.VUE_APP_ADMIN_API}/get_all_users_events`, {
            headers: authHeader(),
        });
    }

    getAllUsers() {
        return axios.get(`${process.env.VUE_APP_ADMIN_API}/get_all_users`, {
            headers: authHeader(),
        });
    }

    registerUser(newUserData) {
        return axios.post(
            `${process.env.VUE_APP_ADMIN_API}/register_user`, {...newUserData }, { headers: authHeader() }
        );
    }

    updateUser(editUserData) {
        return axios.put(
            `${process.env.VUE_APP_ADMIN_API}/update_user`, {...editUserData }, { headers: authHeader() }
        );
    }

    deleteUser(id) {
        return axios.put(
            `${process.env.VUE_APP_ADMIN_API}/delete_user?id=${id}`, {}, {
                headers: authHeader(),
            }
        );
    }

    getAllReminders() {
        return axios.get(`${process.env.VUE_APP_ADMIN_API}/get_all_reminders`, {
            headers: authHeader(),
        });
    }
    newReminder(newReminderData) {
        return axios.post(
            `${process.env.VUE_APP_ADMIN_API}/new_reminder`, {...newReminderData }, { headers: authHeader() }
        );
    }

    updateReminder(editReminderData) {
        return axios.put(
            `${process.env.VUE_APP_ADMIN_API}/update_reminder`, {...editReminderData }, { headers: authHeader() }
        );
    }

    deleteReminder(id) {
        return axios.put(
            `${process.env.VUE_APP_ADMIN_API}/delete_reminder?id=${id}`, {}, {
                headers: authHeader(),
            }
        );
    }

    getHolidays() {
        return axios.get(`${process.env.VUE_APP_ADMIN_API}/get_holidays`, {
            headers: authHeader(),
        });
    }

    manageHolidays(holidaysData) {
        return axios.post(
            `${process.env.VUE_APP_ADMIN_API}/manage_holidays`, {
                ...holidaysData
            }, { headers: authHeader() }
        );
    }

    getAllProjects() {
        return axios.get(`${process.env.VUE_APP_ADMIN_API}/get_all_projects`, {
            headers: authHeader(),
        });
    }

    newProject(newProjectData) {
        return axios.post(
            `${process.env.VUE_APP_ADMIN_API}/new_project`, {...newProjectData }, { headers: authHeader() }
        );
    }

    updateProject(editProjectData) {
        return axios.put(
            `${process.env.VUE_APP_ADMIN_API}/update_project`, {...editProjectData }, { headers: authHeader() }
        );
    }

    deleteProject(id) {
        return axios.put(
            `${process.env.VUE_APP_ADMIN_API}/delete_project?id=${id}`, {}, {
                headers: authHeader(),
            }
        );
    }

    participateInProject(participateInProjectData) {
        return axios.put(
            `${process.env.VUE_APP_ADMIN_API}/participate_in_project`, {...participateInProjectData }, { headers: authHeader() }
        );
    }

    exitFromProject(exitFromProjectData) {
        return axios.put(
            `${process.env.VUE_APP_ADMIN_API}/exit_from_project`, {...exitFromProjectData }, { headers: authHeader() }
        );
    }


}

export default new AdminService();