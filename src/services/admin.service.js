import axios from "axios";
import authHeader from "./auth-header";

class AdminService {

    //USERS
    getAllUsersEvents() {
        return axios.get(`${process.env.VUE_APP_ADMIN_API}/users/events`, {
            headers: authHeader(),
        });
    }

    getAllUsers() {
        return axios.get(`${process.env.VUE_APP_ADMIN_API}/users`, {
            headers: authHeader(),
        });
    }

    getUserById(id) {
        return axios.get(`${process.env.VUE_APP_ADMIN_API}/users/${id}`, {
            headers: authHeader(),
        });
    }

    registerUser(newUserData) {
        return axios.post(
            `${process.env.VUE_APP_ADMIN_API}/users/register`, {...newUserData }, { headers: authHeader() }
        );
    }

    updateUser(editUserData) {
        return axios.put(
            `${process.env.VUE_APP_ADMIN_API}/users/update/${editUserData.id}`, {...editUserData }, { headers: authHeader() }
        );
    }

    deleteUser(id) {
        return axios.delete(
            `${process.env.VUE_APP_ADMIN_API}/users/delete/${id}`, {
                headers: authHeader(),
            }
        );
    }


    // HOLDIAYS
    getHolidays() {
        return axios.get(`${process.env.VUE_APP_ADMIN_API}/holidays`, {
            headers: authHeader(),
        });
    }

    manageHolidays(holidaysData) {
        return axios.post(
            `${process.env.VUE_APP_ADMIN_API}/holidays/manage`, {
                ...holidaysData
            }, { headers: authHeader() }
        );
    }

}

export default new AdminService();