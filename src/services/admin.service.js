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
      `${process.env.VUE_APP_ADMIN_API}/register_user`,
      { ...newUserData },
      { headers: authHeader() }
    );
  }

  updateUser(editUserData) {
    return axios.put(
      `${process.env.VUE_APP_ADMIN_API}/update_user`,
      { ...editUserData },
      { headers: authHeader() }
    );
  }

  deleteUser(id) {
    return axios.put(
      `${process.env.VUE_APP_ADMIN_API}/delete_user?id=${id}`,
      {},
      {
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
      `${process.env.VUE_APP_ADMIN_API}/new_reminder`,
      { ...newReminderData },
      { headers: authHeader() }
    );
  }

  updateReminder(editReminderData) {
    return axios.put(
      `${process.env.VUE_APP_ADMIN_API}/update_reminder`,
      { ...editReminderData },
      { headers: authHeader() }
    );
  }

  deleteReminder(id) {
    return axios.put(
      `${process.env.VUE_APPVUE_APP_ADMIN_API_API}/delete_reminder?id=${id}`,
      {},
      {
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
      `${process.env.VUE_APP_ADMIN_API}/manage_holidays`,
      {
        ...holidaysData
      },
      { headers: authHeader() }
    );
}

getAllProjects() {
  return axios.get(`${process.env.VUE_APP_ADMIN_API}/get_all_projects`, {
    headers: authHeader(),
  });
}

}

export default new AdminService();
