import axios from "axios";
import authHeader from "./auth-header";

class UserService {
  getUserEvents(id) {
    return axios.get(`${process.env.VUE_APP_API}/user/absences`, {
      headers: authHeader(),
    });
  }

  getUserAbsences(id) {
    return axios.get(`${process.env.VUE_APP_API}/user/absences`, {
      headers: authHeader(),
    });
  }

  manageUserAbsences(absencesData) {
    return axios.post(
      `${process.env.VUE_APP_API}/user/absences/manage`,
      {
        ...absencesData
      },
      { headers: authHeader() }
    );
  }

}

export default new UserService();
