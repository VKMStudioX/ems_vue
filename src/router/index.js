import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";

const Dashboard = () => import("../views/Dashboard.vue");
const DashboardEvents = () => import("../components/dashboard/Events.vue");
const DashboardAbsences = () => import("../components/dashboard/Absences.vue");

const ManageReminders = () => import("../components/dashboard/admin/ManageReminders.vue");
const ManageRemindersNew = () => import("../components/dashboard/admin/ManageRemindersNew.vue")
const ManageRemindersEdit = () => import("../components/dashboard/admin/ManageRemindersEdit.vue")

const ManageHolidays = () => import("../components/dashboard/admin/ManageHolidays.vue");

const ManageUsers = () => import("../components/dashboard/admin/ManageUsers.vue");
const ManageUserNew = () => import("../components/dashboard/admin/ManageUsersNew.vue")
const ManageUserEdit = () => import("../components/dashboard/admin/ManageUsersEdit.vue")

const routes = [
  { path: "/:pathMatch(.*)*", component: Auth },
  {
    path: "/login",
    alias: "/",
    name: "login",
    component: Auth,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "/dashboard/",
        component:DashboardEvents,
      },
      {
        path: "/dashboard/absences",
        component: DashboardAbsences,
      },
      {
        path: "/dashboard/manage-reminders",
        component: ManageReminders,
      },
      {
        path: "/dashboard/new-reminder",
        component: ManageRemindersNew,
        props: false,
      },
      {
        path: `/dashboard/edit-reminder`,
        component: ManageRemindersEdit,
        props: (route) => ({ query: route.query.id }),
      },
       
      {
        path: "/dashboard/manage-holidays",
        component: ManageHolidays,
      },
      
      {
        path: "/dashboard/manage-users",
        component: ManageUsers,
      },
      {
        path: "/dashboard/new-user",
        component: ManageUserNew,
        props: false,
      },
      {
        path: `/dashboard/edit-user`,
        component: ManageUserEdit,
        props: (route) => ({ query: route.query.id }),
      },
    ]
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = JSON.parse(localStorage.getItem("userInfo"));
  if ((to.name !== "login" && !loggedIn) || (to.name === "" && !loggedIn))
    next({ name: "login" });
  else next();
});

export default router;
