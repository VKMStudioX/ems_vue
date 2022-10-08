import { createStore } from "vuex";
import { createLogger } from "vuex";
import { auth } from "./modules/auth.module";
import { user } from "./modules/user.module";
import { admin } from "./modules/admin.module";
import { reminder } from "./modules/reminder.module"

const store = createStore({
  modules: {
    auth,
    user,
    admin,
    reminder,
  },
  plugins: [createLogger()],
});

export default store;
