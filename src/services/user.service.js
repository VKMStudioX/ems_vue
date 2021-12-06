import axios from "axios";
import authHeader from "./auth-header";

class UserService {
  getUserEvents(id) {
    return axios.get(`${process.env.VUE_APP_API}/user_events?id=${id}`, {
      headers: authHeader(),
    });
  }

  getUserAbsences(id) {
    return axios.get(`${process.env.VUE_APP_API}/user_absences?id=${id}`, {
      headers: authHeader(),
    });
  }

  manageUserAbsences(absencesData) {
    return axios.post(
      `${process.env.VUE_APP_API}/manage_user_absences`,
      {
        ...absencesData
      },
      { headers: authHeader() }
    );
  }






}

export default new UserService();
