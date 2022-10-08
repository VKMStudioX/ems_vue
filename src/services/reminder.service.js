import axios from "axios";
import authHeader from "./auth-header";

class ReminderService {

    // USER+ADMIN
    getAllReminders() {
        return axios.get(`${process.env.VUE_APP_API}/reminders`, {
            headers: authHeader(),
        });
    }


    // ADMIN
    getReminderById(id) {
        return axios.get(`${process.env.VUE_APP_ADMIN_API}/reminders/${id}`, {
            headers: authHeader(),
        });
    }

    newReminder(newReminderData) {
        return axios.post(
            `${process.env.VUE_APP_ADMIN_API}/reminders/new`, {...newReminderData }, { headers: authHeader() }
        );
    }

    updateReminder(editReminderData) {
        return axios.put(
            `${process.env.VUE_APP_ADMIN_API}/reminders/update/${editReminderData.id}`, {...editReminderData }, { headers: authHeader() }
        );
    }

    deleteReminder(id) {
        return axios.delete(
            `${process.env.VUE_APP_ADMIN_API}/reminders/delete/${id}`, {
                headers: authHeader(),
            }
        );
    }

}

export default new ReminderService();